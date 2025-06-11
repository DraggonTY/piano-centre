
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ChatFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatForm = ({ isOpen, onClose }: ChatFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", phone: "", message: "" });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-card rounded-xl shadow-2xl z-40 border border-border overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-primary p-6 text-center">
        <div className="w-16 h-16 bg-background rounded-full mx-auto mb-3 flex items-center justify-center">
          <div className="text-center">
            <div className="font-serif font-bold text-lg text-foreground">PIANO</div>
            <div className="font-serif italic text-sm text-muted-foreground -mt-1">Centre</div>
          </div>
        </div>
        <p className="text-primary-foreground text-sm font-medium">
          Someone from our team will be with you shortly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>
        
        <div>
          <Input
            placeholder="Mobile Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="min-h-[80px] resize-none"
            required
          />
        </div>

        <div className="text-xs text-muted-foreground text-center">
          *By submitting this form, you consent to receive marketing text messages from Piano Centre and comply with our{" "}
          <span className="text-primary underline cursor-pointer">policy</span>. Message and data rates may apply. Message frequency varies.
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full py-3"
        >
          Text Us
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center py-3 text-xs text-muted-foreground border-t border-border">
        Powered by Chekkit
      </div>
    </div>
  );
};
