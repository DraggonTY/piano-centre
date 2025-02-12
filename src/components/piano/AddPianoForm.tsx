
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddPianoFormProps {
  onSuccess: () => void;
}

export const AddPianoForm = ({ onSuccess }: AddPianoFormProps) => {
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
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = null;

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

      const { error } = await supabase.from("pianos").insert({
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
        image_url,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "New piano added to inventory.",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding piano",
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
      <div className="space-y-2">
        <Label htmlFor="name">Model Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="manufacturer">Manufacturer</Label>
        <Input
          id="manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          placeholder="e.g., Steinway & Sons"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="modelYear">Model Year</Label>
          <Input
            id="modelYear"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
            placeholder="e.g., 2021"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter detailed specifications and features..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price *</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Category</Label>
          <Input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Grand, Upright, Digital, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Input
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="New, Restored, Vintage, etc."
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="finish">Finish</Label>
        <Input
          id="finish"
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
          placeholder="e.g., Polished Ebony"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width (cm)</Label>
          <Input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="depth">Depth (cm)</Label>
          <Input
            id="depth"
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="keys">Number of Keys</Label>
          <Input
            id="keys"
            type="number"
            value={keys}
            onChange={(e) => setKeys(e.target.value)}
            placeholder="e.g., 88"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pedals">Number of Pedals</Label>
          <Input
            id="pedals"
            type="number"
            value={pedals}
            onChange={(e) => setPedals(e.target.value)}
            placeholder="e.g., 3"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Product Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Adding..." : "Add to Inventory"}
      </Button>
    </form>
  );
};
