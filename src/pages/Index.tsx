
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Piano } from "@/types/piano";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedPianos } from "@/components/home/FeaturedPianos";
import { CategorySection } from "@/components/home/CategorySection";
import { ContactSection } from "@/components/home/ContactSection";

const Index = () => {
  const { toast } = useToast();

  const { data: featuredPianos, isLoading, refetch } = useQuery({
    queryKey: ['featured-pianos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pianos')
        .select('*, image_urls, key_image_url')
        .eq('is_featured', true)
        .order('featured_order', { ascending: true })
        .limit(3);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching pianos",
          description: error.message,
        });
        throw error;
      }
      
      // Transform data to match Piano interface, providing defaults for new fields
      const transformedData: Piano[] = (data || []).map(piano => ({
        ...piano,
        image_urls: piano.image_urls || null,
        key_image_url: piano.key_image_url || null
      }));
      
      return transformedData;
    },
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPianos 
        pianos={featuredPianos} 
        isLoading={isLoading} 
        onFeaturedUpdate={refetch}
      />
      <CategorySection />
      <ContactSection />
    </div>
  );
};

export default Index;
