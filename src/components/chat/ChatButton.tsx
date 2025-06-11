
import { MessageCircle, X } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group hover:scale-105"
    >
      {isOpen ? (
        <X className="w-6 h-6 transition-transform duration-200" />
      ) : (
        <MessageCircle className="w-6 h-6 transition-transform duration-200" />
      )}
    </button>
  );
};
