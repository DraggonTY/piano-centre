
import { motion } from "framer-motion";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface PianoCardProps {
  piano: Piano;
}

export const PianoCard = ({ piano }: PianoCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{piano.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {piano.image_url && (
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img 
                    src={piano.image_url} 
                    alt={piano.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      ${piano.price.toLocaleString()}
                    </p>
                    {piano.condition && (
                      <p className="text-gray-600">Condition: {piano.condition}</p>
                    )}
                  </div>
                </div>

                {piano.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600">{piano.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {piano.manufacturer && (
                    <div>
                      <span className="font-semibold">Manufacturer:</span>
                      <p className="text-gray-600">{piano.manufacturer}</p>
                    </div>
                  )}
                  {piano.model_year && (
                    <div>
                      <span className="font-semibold">Model Year:</span>
                      <p className="text-gray-600">{piano.model_year}</p>
                    </div>
                  )}
                  {piano.type && (
                    <div>
                      <span className="font-semibold">Type:</span>
                      <p className="text-gray-600">{piano.type}</p>
                    </div>
                  )}
                  {piano.finish && (
                    <div>
                      <span className="font-semibold">Finish:</span>
                      <p className="text-gray-600">{piano.finish}</p>
                    </div>
                  )}
                  {piano.keyboard_keys && (
                    <div>
                      <span className="font-semibold">Keys:</span>
                      <p className="text-gray-600">{piano.keyboard_keys}</p>
                    </div>
                  )}
                  {piano.pedals && (
                    <div>
                      <span className="font-semibold">Pedals:</span>
                      <p className="text-gray-600">{piano.pedals}</p>
                    </div>
                  )}
                </div>

                {(piano.width_cm || piano.height_cm || piano.depth_cm) && (
                  <div>
                    <h4 className="font-semibold mb-2">Dimensions</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {piano.width_cm && (
                        <div>
                          <span className="text-sm text-gray-500">Width</span>
                          <p className="font-medium">{piano.width_cm}cm</p>
                        </div>
                      )}
                      {piano.height_cm && (
                        <div>
                          <span className="text-sm text-gray-500">Height</span>
                          <p className="font-medium">{piano.height_cm}cm</p>
                        </div>
                      )}
                      {piano.depth_cm && (
                        <div>
                          <span className="text-sm text-gray-500">Depth</span>
                          <p className="font-medium">{piano.depth_cm}cm</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button className="w-full" size="lg">
                    Schedule a Viewing
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};
