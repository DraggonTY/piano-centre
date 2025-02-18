
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";

interface PianoCardProps {
  piano: Piano;
}

export const PianoCard = ({ piano }: PianoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden group relative"
    >
      {piano.image_url && (
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={piano.image_url} 
            alt={piano.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{piano.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{piano.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">
            ${piano.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">{piano.condition}</span>
        </div>
        <Link to={`/pianos`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </motion.div>
  );
};
