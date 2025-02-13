
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
  useState(() => {
    checkAdminStatus();
  }, [session?.user?.id]);

  const handleFeatureToggle = async (piano: Piano) => {
    if (!session?.user?.id) return;
    setUpdating(true);

    try {
      const { error } = await supabase
        .from('pianos')
        .update({
          is_featured: !piano.is_featured,
          featured_order: !piano.is_featured ? 
            (pianos?.filter(p => p.is_featured).length || 0) + 1 : 
            null
        })
        .eq('id', piano.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Piano ${piano.is_featured ? 'removed from' : 'added to'} featured list.`,
      });

      if (onFeaturedUpdate) onFeaturedUpdate();
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
                <div className="flex gap-2">
                  <Link to={`/pianos`} className="flex-1">
                    <Button className="w-full">View Details</Button>
                  </Link>
                  {isAdmin && (
                    <Button
                      variant={piano.is_featured ? "destructive" : "outline"}
                      disabled={updating}
                      onClick={() => handleFeatureToggle(piano)}
                      className="whitespace-nowrap"
                    >
                      {piano.is_featured ? "Unfeature" : "Feature"}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/pianos">
            <Button variant="outline" size="lg">
              View All Pianos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
