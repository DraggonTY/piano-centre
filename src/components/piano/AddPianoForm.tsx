
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { CategoryFields } from "./form/CategoryFields";
import { DimensionsFields } from "./form/DimensionsFields";
import { ImageUploadField } from "./form/ImageUploadField";
import { Piano } from "@/types/piano";

interface AddPianoFormProps {
  onSuccess: () => void;
  initialData?: Piano;
}

export const AddPianoForm = ({ onSuccess, initialData }: AddPianoFormProps) => {
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
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = initialData?.image_url || null;

      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('piano-images')
          .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('piano-images')
          .getPublicUrl(fileName);

        image_url = publicUrl;
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
      };

      if (initialData?.id) {
        // Update existing piano
        const { error: updateError } = await supabase
          .from("pianos")
          .update(pianoData)
          .match({ id: initialData.id });

        if (updateError) throw updateError;
      } else {
        // Insert new piano
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
      console.error('Error details:', error);
      toast({
        variant: "destructive",
        title: initialData ? "Error updating piano" : "Error adding piano",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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
      />
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
      <ImageUploadField handleImageChange={handleImageChange} />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (initialData ? "Updating..." : "Adding...") : (initialData ? "Update Piano" : "Add to Inventory")}
      </Button>
    </form>
  );
};
