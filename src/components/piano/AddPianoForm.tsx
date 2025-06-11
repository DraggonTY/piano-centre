
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { CategoryFields } from "./form/CategoryFields";
import { DimensionsFields } from "./form/DimensionsFields";
import { MultipleImageUploadField } from "./form/MultipleImageUploadField";
import { Piano } from "@/types/piano";
import { useAuth } from "@/providers/AuthProvider";

interface AddPianoFormProps {
  onSuccess: () => void;
  initialData?: Piano;
}

export const AddPianoForm = ({ onSuccess, initialData }: AddPianoFormProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
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
  const [loading, setLoading] = useState(false);

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

    const imageUrls: string[] = [];
    
    for (const image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('piano-images')
        .upload(fileName, image);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('piano-images')
        .getPublicUrl(fileName);

      imageUrls.push(publicUrl);
    }

    const keyImageUrl = imageUrls[keyImageIndex] || imageUrls[0] || null;
    
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

    try {
      let image_urls = initialData?.image_urls || [];
      let key_image_url = initialData?.key_image_url || null;
      let image_url = initialData?.image_url || null;

      if (images.length > 0) {
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

      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from("pianos")
          .update(pianoData)
          .eq('id', initialData.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("pianos")
          .insert([pianoData]);

        if (insertError) throw insertError;
      }

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
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto px-4">
      <BasicInfoFields
        name={name}
        setName={setName}
        manufacturer={manufacturer}
        setManufacturer={setManufacturer}
        modelYear={modelYear}
        setModelYear={setModelYear}
        serialNumber={serialNumber}
        setSerialNumber={setSerialNumber}
        description={description}
        setDescription={setDescription}
        showDescription={false}
      />
      <MultipleImageUploadField
        images={images}
        keyImageIndex={keyImageIndex}
        onImagesChange={setImages}
        onKeyImageChange={setKeyImageIndex}
      />
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the piano's features, condition, and any notable characteristics..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <CategoryFields
        category={category}
        setCategory={setCategory}
        type={type}
        setType={setType}
        condition={condition}
        setCondition={setCondition}
        finish={finish}
        setFinish={setFinish}
        price={price}
        setPrice={setPrice}
      />
      <DimensionsFields
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        depth={depth}
        setDepth={setDepth}
        keys={keys}
        setKeys={setKeys}
        pedals={pedals}
        setPedals={setPedals}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (initialData ? "Updating..." : "Adding...") : (initialData ? "Update Piano" : "Add to Inventory")}
      </Button>
    </form>
  );
};
