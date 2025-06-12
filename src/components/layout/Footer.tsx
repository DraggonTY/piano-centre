
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © 2024 Piano Centre Edmonton. All rights reserved.
          </div>
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
