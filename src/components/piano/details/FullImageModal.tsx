
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Always prevent all event propagation to stop it from reaching the underlying dialog
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    // Only close if clicking directly on the backdrop, not on any child elements
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

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
  if (!isOpen) {
    if (scale !== 1 || position.x !== 0 || position.y !== 0) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onWheel={handleWheel}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      style={{ isolation: 'isolate' }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          onClose();
        }}
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
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        draggable={false}
      />
    </div>
  );
};
