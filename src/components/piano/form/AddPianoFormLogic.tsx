
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Piano } from "@/types/piano";
import { useAuth } from "@/providers/AuthProvider";

export const useAddPianoForm = (onSuccess: () => void, initialData?: Piano) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [keys, setKeys] = useState("");
  const [pedals, setPedals] = useState("");
  const [finish, setFinish] = useState("");
  const [category, setCategory] = useState("new");
  const [images, setImages] = useState<File[]>([]);
  const [keyImageIndex, setKeyImageIndex] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setPrice(initialData.price.toString());
      setType(initialData.type || "");
      setCondition(initialData.condition || "");
      setManufacturer(initialData.manufacturer || "");
      setModelYear(initialData.model_year || "");
      setSerialNumber(initialData.serial_number || "");
      setWidth(initialData.width_cm?.toString() || "");
      setHeight(initialData.height_cm?.toString() || "");
      setDepth(initialData.depth_cm?.toString() || "");
      setKeys(initialData.keyboard_keys?.toString() || "");
      setPedals(initialData.pedals?.toString() || "");
      setFinish(initialData.finish || "");
      setCategory(initialData.category);
    }
  }, [initialData]);

  const uploadImages = async () => {
    if (images.length === 0) return { imageUrls: [], keyImageUrl: null };

    console.log('Starting image upload for', images.length, 'images');
    const imageUrls: string[] = [];
    
    // Create storage bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.find(bucket => bucket.name === 'piano-images');
    
    if (!bucketExists) {
      console.log('Creating piano-images bucket');
      const { error: bucketError } = await supabase.storage.createBucket('piano-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      });
      
      if (bucketError) {
        console.error('Error creating bucket:', bucketError);
        throw new Error('Failed to create storage bucket: ' + bucketError.message);
      }
    }
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      console.log(`Uploading image ${i + 1}/${images.length}:`, image.name);
      
      try {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('piano-images')
          .upload(fileName, image, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error for image:', image.name, uploadError);
          throw new Error(`Failed to upload ${image.name}: ${uploadError.message}`);
        }

        if (!data?.path) {
          throw new Error(`No path returned for uploaded image: ${image.name}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('piano-images')
          .getPublicUrl(data.path);

        if (!publicUrl) {
          throw new Error(`Failed to get public URL for: ${image.name}`);
        }

        imageUrls.push(publicUrl);
        console.log(`Successfully uploaded image ${i + 1}:`, publicUrl);
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);
        throw error;
      }
    }

    const keyImageUrl = imageUrls[keyImageIndex] || imageUrls[0] || null;
    console.log('Upload complete. Key image URL:', keyImageUrl);
    
    return { imageUrls, keyImageUrl };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to perform this action",
      });
      return;
    }

    setLoading(true);
    console.log('Starting piano submission...');

    try {
      let image_urls = initialData?.image_urls || [];
      let key_image_url = initialData?.key_image_url || null;
      let image_url = initialData?.image_url || null;

      // Only upload new images if files are selected
      if (images.length > 0) {
        console.log('New images detected, uploading...');
        const { imageUrls, keyImageUrl } = await uploadImages();
        image_urls = imageUrls;
        key_image_url = keyImageUrl;
        image_url = keyImageUrl; // For backward compatibility
      }

      const pianoData = {
        name,
        description,
        price: parseFloat(price),
        type,
        condition,
        manufacturer,
        model_year: modelYear,
        serial_number: serialNumber,
        width_cm: width ? parseFloat(width) : null,
        height_cm: height ? parseFloat(height) : null,
        depth_cm: depth ? parseFloat(depth) : null,
        keyboard_keys: keys ? parseInt(keys) : null,
        pedals: pedals ? parseInt(pedals) : null,
        finish,
        category,
        image_url,
        image_urls,
        key_image_url,
        user_id: session.user.id
      };

      console.log('Submitting piano data:', pianoData);

      if (initialData?.id) {
        console.log('Updating existing piano:', initialData.id);
        const { error: updateError } = await supabase
          .from("pianos")
          .update(pianoData)
          .eq('id', initialData.id);

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }
      } else {
        console.log('Creating new piano');
        const { error: insertError } = await supabase
          .from("pianos")
          .insert([pianoData]);

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }
      }

      console.log('Piano operation successful');
      onSuccess();
      toast({
        title: initialData ? "Piano Updated" : "Piano Added",
        description: initialData ? "The piano has been updated successfully." : "New piano has been added to inventory.",
      });
    } catch (error: any) {
      console.error('Operation error:', error);
      toast({
        variant: "destructive",
        title: initialData ? "Error updating piano" : "Error adding piano",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    // Form state
    name, setName,
    description, setDescription,
    price, setPrice,
    type, setType,
    condition, setCondition,
    manufacturer, setManufacturer,
    modelYear, setModelYear,
    serialNumber, setSerialNumber,
    width, setWidth,
    height, setHeight,
    depth, setDepth,
    keys, setKeys,
    pedals, setPedals,
    finish, setFinish,
    category, setCategory,
    images, setImages,
    keyImageIndex, setKeyImageIndex,
    loading,
    handleSubmit,
    initialData
  };
};
