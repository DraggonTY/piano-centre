
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Edit, Check, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Create schema for hero section content
const heroContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  tagline: z.string().min(1, "Tagline is required"),
  viewCollectionText: z.string().min(1, "Button text is required"),
  viewCollectionLink: z.string().min(1, "Button link is required"),
  scheduleVisitText: z.string().min(1, "Button text is required"),
  scheduleVisitLink: z.string().min(1, "Button link is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
});

type HeroContent = z.infer<typeof heroContentSchema>;

const defaultHeroContent: HeroContent = {
  title: "Discover Your Perfect Piano",
  subtitle: "Experience our curated selection of world-class pianos, each crafted to perfection and ready to bring music to your home.",
  tagline: "Excellence in Music Since 1980",
  viewCollectionText: "View Collection",
  viewCollectionLink: "/pianos",
  scheduleVisitText: "Schedule a Visit",
  scheduleVisitLink: "/contact",
  imageUrl: "/lovable-uploads/0ac4679a-cee5-408f-a113-3252ab86e84b.png",
};

export const HeroSection = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { session } = useAuth();

  // Form for editing hero content
  const form = useForm<HeroContent>({
    resolver: zodResolver(heroContentSchema),
    defaultValues: heroContent,
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!session?.user?.id) {
        setIsAdmin(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();
      
      if (!error && data) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [session?.user?.id]);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_content')
          .select('*')
          .single();
        
        if (error) {
          console.error('Error fetching hero content:', error);
          return;
        }
        
        if (data) {
          setHeroContent(data as HeroContent);
          form.reset(data as HeroContent);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };

    fetchHeroContent();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: HeroContent) => {
    setLoading(true);
    try {
      // Upload image if new one is selected
      if (imageFile) {
        // Create unique filename
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('hero_images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: urlData } = await supabase.storage
          .from('hero_images')
          .getPublicUrl(filePath);

        if (urlData) {
          data.imageUrl = urlData.publicUrl;
        }
      }

      // Update or insert hero content in database
      const { error } = await supabase
        .from('hero_content')
        .upsert(data, { onConflict: 'id' });

      if (error) {
        throw error;
      }

      setHeroContent(data);
      setOpen(false);
      toast({
        title: "Success",
        description: "Hero content updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating hero content:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <img 
        src={heroContent.imageUrl}
        alt="Piano showroom"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ maxWidth: 'none' }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      {isAdmin && (
        <div className="absolute top-4 right-4 z-20">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Hero Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Hero Section</DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subtitle</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tagline</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">First Button</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="viewCollectionText"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Text</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="viewCollectionLink"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Second Button</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="scheduleVisitText"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Text</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="scheduleVisitLink"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Image URL</FormLabel>
                          <div className="flex items-center space-x-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <div className="relative">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <Button type="button" variant="outline">
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </div>
                          {imagePreview && (
                            <div className="mt-2">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full max-h-40 object-cover rounded-md border"
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {loading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white space-y-6 px-4"
        >
          <span className="inline-block mb-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            {heroContent.tagline}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            {heroContent.title}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            {heroContent.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to={heroContent.viewCollectionLink}>
              <Button 
                size="lg" 
                className="border-2 border-black bg-black text-white hover:bg-white hover:border-white hover:text-black transition-all duration-300 px-8 hover:scale-105"
              >
                {heroContent.viewCollectionText}
              </Button>
            </Link>
            <Link to={heroContent.scheduleVisitLink}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-white text-black hover:bg-black hover:border-black hover:text-white transition-all duration-300 hover:scale-105"
              >
                {heroContent.scheduleVisitText}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </motion.div>
    </section>
  );
};
