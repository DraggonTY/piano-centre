import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);
  
  // Use multiple images if available, fallback to single image_url, or empty array
  const images = piano.image_urls || (piano.image_url ? [piano.image_url] : []);
  const hasMultipleImages = images.length > 1;

  const nextViewDialogImage = () => {
    setViewDialogImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevViewDialogImage = () => {
    setViewDialogImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullImage = () => {
    setIsFullImageOpen(true);
  };

  const closeFullImage = () => {
    setIsFullImageOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[90vw] max-w-[95vw] max-h-[95vh] sm:max-h-[90vh] w-full p-3 sm:p-6 overflow-y-auto rounded-lg sm:rounded-lg">
          <DialogHeader className="pb-3 sm:pb-4">
            <DialogTitle className="text-xl sm:text-2xl pr-6">{piano.name}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6">
            {images.length > 0 && (
              <div className="flex-shrink-0 order-1 lg:order-none">
                <div className="aspect-[4/3] overflow-hidden rounded-lg relative group">
                  <img 
                    src={images[viewDialogImageIndex]} 
                    alt={piano.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={openFullImage}
                  />
                  
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevViewDialogImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={nextViewDialogImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </>
                  )}
                </div>
                
                {hasMultipleImages && (
                  <div className="flex gap-2 mt-3 justify-center overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setViewDialogImageIndex(index)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded border-2 overflow-hidden transition-all flex-shrink-0 ${
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
            
            <div className="space-y-4 min-h-0 order-2 lg:order-none">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    ${piano.price.toLocaleString()}
                  </p>
                  {piano.condition && (
                    <p className="text-gray-600 text-sm sm:text-base">Condition: {piano.condition}</p>
                  )}
                </div>
              </div>

              {piano.description && (
                <div>
                  <h4 className="font-semibold mb-1 text-sm sm:text-base">Description</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{piano.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
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
                  <h4 className="font-semibold mb-1 text-sm sm:text-base">Dimensions</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
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
                <Button className="w-full text-sm sm:text-base" size="lg">
                  Schedule a Viewing
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-size image modal */}
      {isFullImageOpen && images.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeFullImage}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={images[viewDialogImageIndex]}
            alt={piano.name}
            className="max-w-full max-h-full object-contain"
            onClick={closeFullImage}
          />
        </div>
      )}
    </>
  );
};
