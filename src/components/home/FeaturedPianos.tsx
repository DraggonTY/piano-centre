import { Link } from "react-router-dom";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { PianoCard } from "./featured/PianoCard";
import { EmptySlot } from "./featured/EmptySlot";
import { FeaturedPianosDialog } from "./featured/FeaturedPianosDialog";

interface FeaturedPianosProps {
  pianos?: Piano[];
  isLoading: boolean;
  onFeaturedUpdate?: () => void;
}

export const FeaturedPianos = ({
  pianos,
  isLoading,
  onFeaturedUpdate
}: FeaturedPianosProps) => {
  const {
    session
  } = useAuth();
  const {
    toast
  } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [allPianos, setAllPianos] = useState<Piano[]>([]);
  const [loadingPianos, setLoadingPianos] = useState(false);
  const [selectedPianos, setSelectedPianos] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log("Checking admin status...");
      console.log("Session user ID:", session?.user?.id);
      setIsAdmin(false);
      if (!session?.user?.id) {
        console.log("No user session found");
        return;
      }
      const {
        data,
        error
      } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id).eq('role', 'admin').single();
      console.log("Admin check response:", {
        data,
        error
      });
      if (!error && data) {
        console.log("User is admin");
        setIsAdmin(true);
      } else {
        console.log("User is not admin or error occurred");
      }
    };
    checkAdminStatus();
  }, [session?.user?.id]);

  useEffect(() => {
    const loadAllPianos = async () => {
      if (!dialogOpen) return;
      setLoadingPianos(true);
      try {
        const {
          data,
          error
        } = await supabase.from('pianos').select('*').order('created_at', {
          ascending: false
        });
        if (error) throw error;
        setAllPianos(data || []);
        const featured = data?.filter(p => p.is_featured) || [];
        setSelectedPianos(featured.map(p => p.id));
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading pianos",
          description: error.message
        });
      } finally {
        setLoadingPianos(false);
      }
    };
    loadAllPianos();
  }, [dialogOpen]);

  const handleFeatureToggle = async () => {
    if (!session?.user?.id) return;
    setUpdating(true);
    try {
      await supabase.from('pianos').update({
        is_featured: false,
        featured_order: null
      }).eq('is_featured', true);
      for (let i = 0; i < selectedPianos.length; i++) {
        await supabase.from('pianos').update({
          is_featured: true,
          featured_order: i + 1
        }).eq('id', selectedPianos[i]);
      }
      toast({
        title: "Success",
        description: "Featured pianos updated successfully"
      });
      if (onFeaturedUpdate) onFeaturedUpdate();
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePianoSelect = (pianoId: number, checked: boolean) => {
    if (checked && selectedPianos.length >= 4) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only select up to 4 featured pianos"
      });
      return;
    }
    setSelectedPianos(prev => checked ? [...prev, pianoId] : prev.filter(id => id !== pianoId));
  };

  const emptySlots = 3 - (pianos?.length || 0);
  console.log("Current state:", { isAdmin, emptySlots, sessionExists: !!session, pianos: pianos?.length });

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
          ) : (
            <>
              {pianos?.map(piano => (
                <PianoCard key={piano.id} piano={piano} />
              ))}
              {emptySlots > 0 && isAdmin && [...Array(emptySlots)].map((_, index) => (
                <EmptySlot
                  key={`empty-${index}`}
                  index={index}
                  onClick={() => setDialogOpen(true)}
                />
              ))}
            </>
          )}
        </div>
        <div className="text-center mt-12 space-y-4">
          <Link to="/pianos">
            <Button variant="outline" size="lg">
              View All Pianos
            </Button>
          </Link>
          
          {isAdmin && session?.user && (
            <div>
              <FeaturedPianosDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                allPianos={allPianos}
                selectedPianos={selectedPianos}
                onPianoSelect={handlePianoSelect}
                onSave={handleFeatureToggle}
                loading={loadingPianos}
                updating={updating}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
