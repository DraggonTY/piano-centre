
import { useState, useEffect } from "react";
import { Piano } from "@/types/piano";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";

export const useFeaturedPianos = (dialogOpen: boolean, onFeaturedUpdate?: () => void) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [allPianos, setAllPianos] = useState<Piano[]>([]);
  const [loadingPianos, setLoadingPianos] = useState(false);
  const [selectedPianos, setSelectedPianos] = useState<number[]>([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadAllPianos = async () => {
      if (!dialogOpen) return;
      setLoadingPianos(true);
      try {
        // Optimized query - only select needed fields and use better ordering
        const { data, error } = await supabase
          .from('pianos')
          .select('id, name, price, image_urls, key_image_url, is_featured, featured_order, condition, type, manufacturer')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const transformedData: Piano[] = (data || []).map(piano => ({
          ...piano,
          image_urls: piano.image_urls || null,
          key_image_url: piano.key_image_url || null
        }));
        
        setAllPianos(transformedData);
        const featured = transformedData?.filter(p => p.is_featured) || [];
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
  }, [dialogOpen, toast]);

  const handleFeatureToggle = async () => {
    if (!session?.user?.id) return;
    setUpdating(true);
    try {
      // Batch operations for better performance
      const operations = [];
      
      // First, unfeatured all currently featured pianos
      operations.push(
        supabase
          .from('pianos')
          .update({ is_featured: false, featured_order: null })
          .eq('is_featured', true)
      );
      
      // Then feature selected pianos with order
      if (selectedPianos.length > 0) {
        const updatePromises = selectedPianos.map((pianoId, index) =>
          supabase
            .from('pianos')
            .update({ is_featured: true, featured_order: index + 1 })
            .eq('id', pianoId)
        );
        operations.push(...updatePromises);
      }
      
      // Execute all operations
      await Promise.all(operations);
      
      toast({
        title: "Success",
        description: "Featured pianos updated successfully"
      });
      
      if (onFeaturedUpdate) onFeaturedUpdate();
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
    setSelectedPianos(prev => 
      checked ? [...prev, pianoId] : prev.filter(id => id !== pianoId)
    );
  };

  return {
    allPianos,
    selectedPianos,
    loadingPianos,
    updating,
    handleFeatureToggle,
    handlePianoSelect
  };
};
