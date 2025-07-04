
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PianoImageGalleryProps {
  images: string[];
  pianoName: string;
  onImageClick: (index: number) => void;
}

export const PianoImageGallery = ({ images, pianoName, onImageClick }: PianoImageGalleryProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false); // Reset loading state for next image
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false); // Reset loading state for previous image
  };

  if (images.length === 0) return null;

  return (
    <div className="flex-shrink-0 order-1 lg:order-none">
      <div className="aspect-[3/2] overflow-hidden rounded-lg relative group mt-4 bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        <img 
          src={images[imageIndex]} 
          alt={pianoName}
          className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => onImageClick(imageIndex)}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
          decoding="async"
          style={{ imageOrientation: 'from-image' }}
        />
        
        {hasMultipleImages && imageLoaded && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={nextImage}
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
              onClick={() => {
                setImageIndex(index);
                setImageLoaded(false);
              }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded border-2 overflow-hidden transition-all flex-shrink-0 bg-gray-100 ${
                index === imageIndex ? 'border-primary' : 'border-gray-200'
              }`}
            >
               <img 
                 src={image} 
                 alt={`${pianoName} ${index + 1}`}
                 className="w-full h-full object-cover"
                 loading="lazy"
                 decoding="async"
                 style={{ imageOrientation: 'from-image' }}
               />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
