
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { HeroContent, defaultHeroContent } from "./types";

export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

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
          if (error.code === 'PGRST116') {
            const { data: insertData, error: insertError } = await supabase
              .from('hero_content')
              .insert({
                title: defaultHeroContent.title,
                subtitle: defaultHeroContent.subtitle,
                tagline: defaultHeroContent.tagline,
                viewCollectionText: defaultHeroContent.viewCollectionText,
                viewCollectionLink: defaultHeroContent.viewCollectionLink,
                scheduleVisitText: defaultHeroContent.scheduleVisitText,
                scheduleVisitLink: defaultHeroContent.scheduleVisitLink,
                imageUrl: defaultHeroContent.imageUrl
              })
              .select()
              .single();
            
            if (insertError) {
              console.error('Error inserting default hero content:', insertError);
              return;
            }
            
            if (insertData) {
              setHeroContent(insertData);
            }
          } else {
            console.error('Error fetching hero content:', error);
          }
          return;
        }
        
        if (data) {
          setHeroContent(data);
        }
      } catch (error) {
        console.error('Error in hero content flow:', error);
      }
    };

    fetchHeroContent();
  }, []);

  const updateHeroContent = async (data: HeroContent, imageFile?: File) => {
    setLoading(true);
    try {
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('hero_images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = await supabase.storage
          .from('hero_images')
          .getPublicUrl(filePath);

        if (urlData) {
          data.imageUrl = urlData.publicUrl;
        }
      }

      let result;
      if (data.id) {
        result = await supabase
          .from('hero_content')
          .update({
            title: data.title,
            subtitle: data.subtitle,
            tagline: data.tagline,
            viewCollectionText: data.viewCollectionText,
            viewCollectionLink: data.viewCollectionLink,
            scheduleVisitText: data.scheduleVisitText,
            scheduleVisitLink: data.scheduleVisitLink,
            imageUrl: data.imageUrl
          })
          .eq('id', data.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('hero_content')
          .insert({
            title: data.title,
            subtitle: data.subtitle,
            tagline: data.tagline,
            viewCollectionText: data.viewCollectionText,
            viewCollectionLink: data.viewCollectionLink,
            scheduleVisitText: data.scheduleVisitText,
            scheduleVisitLink: data.scheduleVisitLink,
            imageUrl: data.imageUrl
          })
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      if (result.data) {
        setHeroContent(result.data);
      }

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

  return {
    heroContent,
    isAdmin,
    loading,
    updateHeroContent,
  };
};
