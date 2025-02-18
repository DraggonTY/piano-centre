
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface EmptySlotProps {
  onClick: () => void;
  index: number;
}

export const EmptySlot = ({ onClick, index }: EmptySlotProps) => {
  return (
    <motion.div
      key={`empty-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center aspect-[4/3] cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <Plus className="h-12 w-12 text-gray-400" />
    </motion.div>
  );
};
