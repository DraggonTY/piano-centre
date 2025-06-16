
import { X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

interface FullImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  pianoName: string;
  onClose: () => void;
}

export const FullImageModal = ({ isOpen, imageUrl, pianoName, onClose }: FullImageModalProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(5, scale + delta));
    
    setScale(newScale);
    
    // Reset position when zooming out to 1x or less
    if (newScale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  }, [onClose]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    // Prevent the overlay click handler from firing when clicking the image
    e.stopPropagation();
  }, []);

  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    // Prevent the overlay click handler from firing when clicking the close button
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Reset zoom when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      onWheel={handleWheel}
    >
      <button
        onClick={handleCloseClick}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-[10000] bg-black/50 rounded-full p-2"
        type="button"
        aria-label="Close image"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={imageUrl}
        alt={pianoName}
        className="max-w-full max-h-full object-contain transition-transform duration-200 cursor-grab active:cursor-grabbing relative z-[10000]"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={handleImageClick}
        draggable={false}
      />
    </div>
  );
};
