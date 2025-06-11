import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/AuthProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddPianoForm } from "./AddPianoForm";
import { Piano } from "@/types/piano";

interface PianoCardProps {
  piano: Piano;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export const PianoCard = ({ piano, onDelete, onUpdate }: PianoCardProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete piano with ID:', piano.id);
      const { error } = await supabase
        .from("pianos")
        .delete()
        .eq('id', piano.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Piano listing deleted successfully",
      });

      if (onDelete) onDelete();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete piano listing: " + error.message,
      });
    }
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    if (onUpdate) onUpdate();
    toast({
      title: "Success",
      description: "Piano listing updated successfully",
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative">
          {piano.image_url && (
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={piano.image_url}
                alt={piano.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          {session && (
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-white h-8 w-8">
                    <Pencil className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg leading-tight">{piano.name}</CardTitle>
          <CardDescription className="text-lg font-semibold text-primary">
            ${piano.price.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3 flex-1">
          <div className="space-y-1 text-sm">
            {piano.condition && (
              <p>
                <span className="font-medium">Condition:</span> {piano.condition}
              </p>
            )}
            {piano.type && (
              <p>
                <span className="font-medium">Type:</span> {piano.type}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button className="w-full" size="sm" onClick={() => setIsViewDialogOpen(true)}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl">{piano.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {piano.image_url && (
              <div className="flex-shrink-0">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img 
                    src={piano.image_url} 
                    alt={piano.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-4 min-h-0">
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
                  <h4 className="font-semibold mb-1">Description</h4>
                  <p className="text-gray-600 text-sm">{piano.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
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
                  <h4 className="font-semibold mb-1">Dimensions</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {piano.width_cm && (
                      <div>
                        <span className="text-xs text-gray-500">Width</span>
                        <p className="font-medium">{piano.width_cm}cm</p>
                      </div>
                    )}
                    {piano.height_cm && (
                      <div>
                        <span className="text-xs text-gray-500">Height</span>
                        <p className="font-medium">{piano.height_cm}cm</p>
                      </div>
                    )}
                    {piano.depth_cm && (
                      <div>
                        <span className="text-xs text-gray-500">Depth</span>
                        <p className="font-medium">{piano.depth_cm}cm</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t">
                <Button className="w-full" size="lg">
                  Schedule a Viewing
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Piano Listing</DialogTitle>
          </DialogHeader>
          <AddPianoForm onSuccess={handleEditSuccess} initialData={piano} />
        </DialogContent>
      </Dialog>
    </>
  );
};
