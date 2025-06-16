
import { X } from "lucide-react";

interface FullImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  pianoName: string;
  onClose: () => void;
}

export const FullImageModal = ({ isOpen, imageUrl, pianoName, onClose }: FullImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
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
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
