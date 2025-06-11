
import { motion } from "framer-motion";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PianoDetailsDialog } from "@/components/piano/PianoDetailsDialog";

interface PianoCardProps {
  piano: Piano;
}

export const PianoCard = ({ piano }: PianoCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use key image if available, otherwise use first image from array, or fallback to single image_url
  const displayImage = piano.key_image_url || 
                      (piano.image_urls && piano.image_urls.length > 0 ? piano.image_urls[0] : null) || 
                      piano.image_url;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-lg shadow-lg overflow-hidden group relative"
      >
        {displayImage && (
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={displayImage} 
              alt={piano.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{piano.name}</h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-primary">
              ${piano.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">{piano.condition}</span>
          </div>
          
          <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
            View Details
          </Button>
        </div>
      </motion.div>

      <PianoDetailsDialog
        piano={piano}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};
