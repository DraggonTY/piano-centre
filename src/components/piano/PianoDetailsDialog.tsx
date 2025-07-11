
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Piano } from "@/types/piano";
import { PianoImageGallery } from "./details/PianoImageGallery";
import { PianoSpecifications } from "./details/PianoSpecifications";
import { PianoDimensions } from "./details/PianoDimensions";
import { FullScreenImageViewer } from "./details/FullScreenImageViewer";
import { useIsMobile } from "@/hooks/use-mobile";

interface PianoDetailsDialogProps {
  piano: Piano;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PianoDetailsDialog = ({ piano, isOpen, onOpenChange }: PianoDetailsDialogProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Use multiple images if available, fallback to single image_url, or empty array
  const images = piano.image_urls || (piano.image_url ? [piano.image_url] : []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Hide the main dialog when lightbox is open to prevent overlay interference
  const isMainDialogOpen = isOpen && !lightboxOpen;

  // Remove "Description:" prefix from description text
  const cleanDescription = piano.description?.replace(/^Description:\s*/i, '') || '';

  const content = (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4">
      <PianoImageGallery 
        images={images}
        pianoName={piano.name}
        onImageClick={openLightbox}
      />
      
      <div className="space-y-2 sm:space-y-3 min-h-0 order-2 lg:order-none">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
            {piano.name}
          </h3>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-primary">
            ${piano.price.toLocaleString()}
          </p>
          <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-600">
            {piano.condition && (
              <span>Condition: {piano.condition}</span>
            )}
          </div>
        </div>

        {cleanDescription && (
          <div className="space-y-1">
            <h4 className="font-semibold text-sm sm:text-base">Description</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{cleanDescription}</p>
          </div>
        )}

        <PianoSpecifications piano={piano} />
        <PianoDimensions piano={piano} />

        <div className="pt-2 border-t">
          <Button className="w-full text-sm" size="sm">
            Schedule a Viewing
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Sheet open={isMainDialogOpen} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" className="h-[100vh] pt-20 p-4 overflow-y-auto [&>button]:top-4 [&>button]:right-4">
            <SheetHeader className="pb-3">
              <SheetTitle className="sr-only">Piano Details</SheetTitle>
            </SheetHeader>
            {content}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isMainDialogOpen} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[90vw] max-w-[95vw] max-h-[80vh] sm:max-h-[85vh] w-full p-3 sm:p-4 overflow-y-auto rounded-lg [&>button]:top-3 [&>button]:right-3 sm:[&>button]:top-4 sm:[&>button]:right-4 my-4">
            <DialogHeader className="pb-2 sm:pb-3 pt-2">
              <DialogTitle className="sr-only">Piano Details</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed information about {piano.name}
              </DialogDescription>
            </DialogHeader>
            {content}
          </DialogContent>
        </Dialog>
      )}

      {/* Render lightbox outside of the main dialog to prevent interference */}
      <FullScreenImageViewer 
        images={images}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};
