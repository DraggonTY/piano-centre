
import { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/AuthProvider";
import { useIsMobile } from "@/hooks/use-mobile";

interface PianoCardImageProps {
  images: string[];
  pianoName: string;
  onEdit: () => void;
  onDelete: () => void;
  onImageClick?: () => void;
}

export const PianoCardImage = ({ images, pianoName, onEdit, onDelete, onImageClick }: PianoCardImageProps) => {
  const { session } = useAuth();
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick();
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div className="aspect-[4/3] overflow-hidden relative group">
        <img
          src={images[currentImageIndex]}
          alt={pianoName}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={handleImageClick}
        />
        
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className={`absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-opacity z-10 ${
                isMobile 
                  ? 'opacity-100 p-1.5' 
                  : 'opacity-0 group-hover:opacity-100 p-1'
              }`}
            >
              <ChevronLeft className={isMobile ? "h-3 w-3" : "h-4 w-4"} />
            </button>
            <button
              onClick={nextImage}
              className={`absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-opacity z-10 ${
                isMobile 
                  ? 'opacity-100 p-1.5' 
                  : 'opacity-0 group-hover:opacity-100 p-2'
              }`}
            >
              <ChevronRight className={isMobile ? "h-3 w-3" : "h-4 w-4"} />
            </button>
          </>
        )}
      </div>
      
      {hasMultipleImages && (
        <div className={`absolute left-1/2 -translate-x-1/2 flex gap-1 ${
          isMobile ? 'bottom-1' : 'bottom-2'
        }`}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`rounded-full transition-colors ${
                isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
              } ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {session && (
        <div className={`absolute top-1 md:top-2 right-1 md:right-2`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-white ${isMobile ? 'h-7 w-7' : 'h-8 w-8'}`}
              >
                <Pencil className={isMobile ? "h-2.5 w-2.5" : "h-3 w-3"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white z-50">
              <DropdownMenuItem onClick={onEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={onDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
