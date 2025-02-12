
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadFieldProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploadField = ({ handleImageChange }: ImageUploadFieldProps) => {
  return (
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
  );
};
