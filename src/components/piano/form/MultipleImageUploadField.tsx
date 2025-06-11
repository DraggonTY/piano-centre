
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MultipleImageUploadFieldProps {
  images: File[];
  keyImageIndex: number;
  onImagesChange: (images: File[]) => void;
  onKeyImageChange: (index: number) => void;
}

export const MultipleImageUploadField = ({ 
  images, 
  keyImageIndex, 
  onImagesChange, 
  onKeyImageChange 
}: MultipleImageUploadFieldProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onImagesChange([...images, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    
    // Adjust key image index if necessary
    if (index === keyImageIndex) {
      onKeyImageChange(0); // Default to first image
    } else if (index < keyImageIndex) {
      onKeyImageChange(keyImageIndex - 1);
    }
  };

  const setKeyImage = (index: number) => {
    onKeyImageChange(index);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="images">Product Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="cursor-pointer"
        />
        <p className="text-sm text-muted-foreground">
          Upload multiple images. Click the star to set a key image that will be used as the thumbnail.
        </p>
      </div>
      
      {images.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Images ({images.length})</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="absolute top-1 right-1 flex gap-1">
                    <Button
                      size="sm"
                      variant={keyImageIndex === index ? "default" : "secondary"}
                      className="h-6 w-6 p-0"
                      onClick={() => setKeyImage(index)}
                      type="button"
                    >
                      <Star className={`h-3 w-3 ${keyImageIndex === index ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  {keyImageIndex === index && (
                    <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-1 rounded">
                      Key Image
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
