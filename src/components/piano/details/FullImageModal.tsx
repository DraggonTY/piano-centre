
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from 'react-dom';

interface FullImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  pianoName: string;
  onClose: () => void;
}

export const FullImageModal = ({ isOpen, imageUrl, pianoName, onClose }: FullImageModalProps) => {
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/90 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10001] text-white hover:text-gray-300 bg-black/50 rounded-full p-2 transition-colors"
        type="button"
        aria-label="Close image"
      >
        <X className="h-6 w-6" />
      </button>
      
      {/* Image */}
      <div className="relative z-[10000] max-w-[90vw] max-h-[90vh] p-4">
        <img
          src={imageUrl}
          alt={pianoName}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
};
