
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface FeaturedPianosProps {
  pianos?: Piano[];
  isLoading: boolean;
  onFeaturedUpdate?: () => void;
}

export const FeaturedPianos = ({ pianos, isLoading, onFeaturedUpdate }: FeaturedPianosProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [allPianos, setAllPianos] = useState<Piano[]>([]);
  const [loadingPianos, setLoadingPianos] = useState(false);
  const [selectedPianos, setSelectedPianos] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Check if user is admin
  const checkAdminStatus = async () => {
    if (!session?.user?.id) return;
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (!error && data) {
      setIsAdmin(true);
    }
  };

  // Run admin check when session changes
  useEffect(() => {
    checkAdminStatus();
  }, [session?.user?.id]);

  // Load all pianos when dialog opens
  useEffect(() => {
    const loadAllPianos = async () => {
      if (!dialogOpen) return;
      setLoadingPianos(true);
      try {
        const { data, error } = await supabase
          .from('pianos')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setAllPianos(data || []);
        
        // Set initial selected pianos
        const featured = data?.filter(p => p.is_featured) || [];
        setSelectedPianos(featured.map(p => p.id));
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading pianos",
          description: error.message,
        });
      } finally {
        setLoadingPianos(false);
      }
    };

    loadAllPianos();
  }, [dialogOpen]);

  const handleFeatureToggle = async (pianoIds: number[]) => {
    if (!session?.user?.id) return;
    setUpdating(true);

    try {
      // First, unfeature all pianos
      await supabase
        .from('pianos')
        .update({
          is_featured: false,
          featured_order: null
        })
        .eq('is_featured', true);

      // Then, feature the selected pianos with order
      for (let i = 0; i < pianoIds.length; i++) {
        await supabase
          .from('pianos')
          .update({
            is_featured: true,
            featured_order: i + 1
          })
          .eq('id', pianoIds[i]);
      }

      toast({
        title: "Success",
        description: "Featured pianos updated successfully",
      });

      if (onFeaturedUpdate) onFeaturedUpdate();
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePianoSelect = (pianoId: number, checked: boolean) => {
    if (checked && selectedPianos.length >= 3) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only select up to 3 featured pianos",
      });
      return;
    }

    setSelectedPianos(prev => 
      checked 
        ? [...prev, pianoId]
        : prev.filter(id => id !== pianoId)
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">Featured Pianos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From classic grand pianos to modern digital instruments, discover our
            carefully selected collection.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                <div className="aspect-[4/3] mb-4 bg-gray-200 rounded-lg"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : pianos?.map((piano) => (
            <motion.div
              key={piano.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden group relative"
            >
              {piano.image_url && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={piano.image_url} 
                    alt={piano.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{piano.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{piano.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ${piano.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">{piano.condition}</span>
                </div>
                <Link to={`/pianos`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12 space-y-4">
          <Link to="/pianos">
            <Button variant="outline" size="lg">
              View All Pianos
            </Button>
          </Link>
          
          {isAdmin && session?.user && (
            <div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="mx-auto block">
                    Edit Featured Pianos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Select Featured Pianos</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {loadingPianos ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {allPianos.map((piano) => (
                          <div key={piano.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                            {piano.image_url && (
                              <img 
                                src={piano.image_url} 
                                alt={piano.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`piano-${piano.id}`}
                                  checked={selectedPianos.includes(piano.id)}
                                  onCheckedChange={(checked) => 
                                    handlePianoSelect(piano.id, checked as boolean)
                                  }
                                />
                                <label 
                                  htmlFor={`piano-${piano.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {piano.name}
                                </label>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">{piano.description}</p>
                              <p className="mt-1 text-sm font-medium">${piano.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleFeatureToggle(selectedPianos)}
                      disabled={updating || loadingPianos}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
