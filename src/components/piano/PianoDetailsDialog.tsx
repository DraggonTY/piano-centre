
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Piano } from "@/types/piano";

interface PianoDetailsDialogProps {
  piano: Piano;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PianoDetailsDialog = ({ piano, isOpen, onOpenChange }: PianoDetailsDialogProps) => {
  const [viewDialogImageIndex, setViewDialogImageIndex] = useState(0);
  
  // Use multiple images if available, fallback to single image_url, or empty array
  const images = piano.image_urls || (piano.image_url ? [piano.image_url] : []);
  const hasMultipleImages = images.length > 1;

  const nextViewDialogImage = () => {
    setViewDialogImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevViewDialogImage = () => {
    setViewDialogImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">{piano.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {images.length > 0 && (
            <div className="flex-shrink-0">
              <div className="aspect-[4/3] overflow-hidden rounded-lg relative group">
                <img 
                  src={images[viewDialogImageIndex]} 
                  alt={piano.name}
                  className="w-full h-full object-cover"
                />
                
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevViewDialogImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextViewDialogImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              
              {hasMultipleImages && (
                <div className="flex gap-2 mt-3 justify-center">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setViewDialogImageIndex(index)}
                      className={`w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                        index === viewDialogImageIndex ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${piano.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-4 min-h-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-bold text-primary">
                  ${piano.price.toLocaleString()}
                </p>
                {piano.condition && (
                  <p className="text-gray-600">Condition: {piano.condition}</p>
                )}
              </div>
            </div>

            {piano.description && (
              <div>
                <h4 className="font-semibold mb-1">Description</h4>
                <p className="text-gray-600 text-sm">{piano.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              {piano.manufacturer && (
                <div>
                  <span className="font-semibold">Manufacturer:</span>
                  <p className="text-gray-600">{piano.manufacturer}</p>
                </div>
              )}
              {piano.model_year && (
                <div>
                  <span className="font-semibold">Model Year:</span>
                  <p className="text-gray-600">{piano.model_year}</p>
                </div>
              )}
              {piano.type && (
                <div>
                  <span className="font-semibold">Type:</span>
                  <p className="text-gray-600">{piano.type}</p>
                </div>
              )}
              {piano.finish && (
                <div>
                  <span className="font-semibold">Finish:</span>
                  <p className="text-gray-600">{piano.finish}</p>
                </div>
              )}
              {piano.keyboard_keys && (
                <div>
                  <span className="font-semibold">Keys:</span>
                  <p className="text-gray-600">{piano.keyboard_keys}</p>
                </div>
              )}
              {piano.pedals && (
                <div>
                  <span className="font-semibold">Pedals:</span>
                  <p className="text-gray-600">{piano.pedals}</p>
                </div>
              )}
            </div>

            {(piano.width_cm || piano.height_cm || piano.depth_cm) && (
              <div>
                <h4 className="font-semibold mb-1">Dimensions</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {piano.width_cm && (
                    <div>
                      <span className="text-xs text-gray-500">Width</span>
                      <p className="font-medium">{piano.width_cm}cm</p>
                    </div>
                  )}
                  {piano.height_cm && (
                    <div>
                      <span className="text-xs text-gray-500">Height</span>
                      <p className="font-medium">{piano.height_cm}cm</p>
                    </div>
                  )}
                  {piano.depth_cm && (
                    <div>
                      <span className="text-xs text-gray-500">Depth</span>
                      <p className="font-medium">{piano.depth_cm}cm</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-2 border-t">
              <Button className="w-full" size="lg">
                Schedule a Viewing
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
