
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

  const { data: featuredPianos, isLoading } = useQuery({
    queryKey: ['pianos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pianos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching pianos",
          description: error.message,
        });
        throw error;
      }
      
      return data as Piano[];
    },
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPianos pianos={featuredPianos} isLoading={isLoading} />
      <CategorySection />
      <ContactSection />
    </div>
  );
};

export default Index;
