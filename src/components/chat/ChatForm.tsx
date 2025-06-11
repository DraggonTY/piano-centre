
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
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form and close
    setFormData({ name: "", phone: "", message: "" });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-40 border border-gray-200 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-center">
        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
          <div className="text-center">
            <div className="font-serif font-bold text-lg text-gray-800">PIANO</div>
            <div className="font-serif italic text-sm text-gray-600 -mt-1">Centre</div>
          </div>
        </div>
        <p className="text-white text-sm font-medium">
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
            className="border-gray-300 rounded-lg"
            required
          />
        </div>
        
        <div>
          <Input
            placeholder="Mobile Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="border-gray-300 rounded-lg"
            required
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="border-gray-300 rounded-lg min-h-[80px] resize-none"
            required
          />
        </div>

        <div className="text-xs text-gray-500 text-center">
          *By submitting this form, you consent to receive marketing text messages from Piano Centre and comply with our{" "}
          <span className="text-blue-500 underline cursor-pointer">policy</span>. Message and data rates may apply. Message frequency varies.
        </div>

        <Button
          type="submit"
          className="w-full bg-gray-400 hover:bg-gray-500 text-white rounded-lg py-3"
        >
          Text Us
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center py-3 text-xs text-gray-400 border-t">
        Powered by Chekkit
      </div>
    </div>
  );
};
