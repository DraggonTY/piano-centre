
import { X } from "lucide-react";
import { useState, useCallback } from "react";

interface FullImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  pianoName: string;
  onClose: () => void;
}

export const FullImageModal = ({ isOpen, imageUrl, pianoName, onClose }: FullImageModalProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(5, scale + delta));
    
    setScale(newScale);
    
    // Reset position when zooming out to 1x or less
    if (newScale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Reset zoom when modal opens/closes
  if (!isOpen) {
    if (scale !== 1 || position.x !== 0 || position.y !== 0) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      onWheel={handleWheel}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X className="h-8 w-8" />
      </button>
      <img
        src={imageUrl}
        alt={pianoName}
        className="max-w-full max-h-full object-contain transition-transform duration-200 cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={handleImageClick}
        draggable={false}
      />
    </div>
  );
};
