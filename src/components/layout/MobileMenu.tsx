
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}

export const MobileMenu = ({ isOpen, onClose, session }: MobileMenuProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Header with close button on left and logo centered */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="flex justify-center flex-1 -ml-12">
            <Link to="/" onClick={onClose} className="block">
              <img
                src="/lovable-uploads/96414221-6d22-4e38-bd12-abcb86467660.png"
                alt="Piano Centre Edmonton"
                className="h-16"
              />
            </Link>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 p-6">
          <div className="space-y-8">
            {/* Pianos Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Pianos</h3>
              <div className="space-y-4">
                <Link 
                  to="/pianos" 
                  onClick={onClose}
                  className="block text-lg text-gray-700 hover:text-primary"
                >
                  Browse Pianos
                </Link>
                <Link 
                  to="/pianos/new" 
                  onClick={onClose}
                  className="block text-lg text-gray-700 hover:text-primary"
                >
                  New Arrivals
                </Link>
                <Link 
                  to="/pianos/used" 
                  onClick={onClose}
                  className="block text-lg text-gray-700 hover:text-primary"
                >
                  Pre-owned
                </Link>
                <Link 
                  to="/pianos/digital" 
                  onClick={onClose}
                  className="block text-lg text-gray-700 hover:text-primary"
                >
                  Digital Pianos
                </Link>
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <div className="space-y-4">
                <Link 
                  to="/services/tuning" 
                  onClick={onClose}
                  className="block text-lg text-gray-700 hover:text-primary"
                >
                  Piano Tuning
                </Link>
                <Link 
                  to="/services/repair" 
                  onClick={onClose}
                  className="block text-lg text-gray-700 hover:text-primary"
                >
                  Repairs & Restoration
                </Link>
                <Link 
                  to="/services/moving" 
                  onClick={onClose}
                  className="block text-lg text-gray-700 hover:text-primary"
                >
                  Piano Moving
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <Link 
                to="/contact" 
                onClick={onClose}
                className="block text-xl font-semibold text-gray-900 hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Sign out button at bottom if logged in */}
        {session && (
          <div className="p-6 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
