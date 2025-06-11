
import { motion } from "framer-motion";
import { Piano } from "@/types/piano";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { PianoDetailsDialog } from "@/components/piano/PianoDetailsDialog";
import { PianoCardImage } from "@/components/piano/PianoCardImage";
import { PianoCardContent } from "@/components/piano/PianoCardContent";

interface PianoCardProps {
  piano: Piano;
}

export const PianoCard = ({ piano }: PianoCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use multiple images if available, fallback to single image_url, or empty array
  const images = piano.image_urls || (piano.image_url ? [piano.image_url] : []);

  const handleViewDetails = () => setIsDialogOpen(true);

  const handleImageClick = () => setIsDialogOpen(true);

  // Empty functions for edit/delete since these shouldn't be available on featured pianos
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
          <PianoCardImage
            images={images}
            pianoName={piano.name}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onImageClick={handleImageClick}
            showActions={false}
          />
          <PianoCardContent
            piano={piano}
            onViewDetails={handleViewDetails}
          />
        </Card>
      </motion.div>

      <PianoDetailsDialog
        piano={piano}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};
