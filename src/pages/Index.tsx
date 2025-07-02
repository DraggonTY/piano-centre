
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Piano } from "@/types/piano";
import { HeroSection } from "@/components/home/HeroSection";
import { lazy, Suspense } from "react";

// Lazy load components that aren't immediately visible
const FeaturedPianos = lazy(() => import("@/components/home/FeaturedPianos").then(module => ({ default: module.FeaturedPianos })));
const CategorySection = lazy(() => import("@/components/home/CategorySection").then(module => ({ default: module.CategorySection })));
const CompanionSection = lazy(() => import("@/components/home/CompanionSection").then(module => ({ default: module.CompanionSection })));
const ContactSection = lazy(() => import("@/components/home/ContactSection").then(module => ({ default: module.ContactSection })));

const Index = () => {
  const { toast } = useToast();

  const { data: featuredPianos, isLoading, refetch } = useQuery({
    queryKey: ['featured-pianos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pianos')
        .select('*')
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
      
      const transformedData: Piano[] = (data || []).map(piano => ({
        ...piano,
        image_urls: piano.image_urls || null,
        key_image_url: piano.key_image_url || null
      }));
      
      return transformedData;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <Suspense fallback={
        <div className="py-24 bg-white">
          <div className="container px-4">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
        <FeaturedPianos 
          pianos={featuredPianos} 
          isLoading={isLoading} 
          onFeaturedUpdate={refetch}
        />
      </Suspense>
      <Suspense fallback={<div className="py-24 bg-gray-50"><div className="animate-pulse h-32"></div></div>}>
        <CategorySection />
      </Suspense>
      <Suspense fallback={<div className="py-24 bg-white"><div className="animate-pulse h-32"></div></div>}>
        <CompanionSection />
      </Suspense>
      <Suspense fallback={<div className="py-24 bg-white"><div className="animate-pulse h-32"></div></div>}>
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default Index;
