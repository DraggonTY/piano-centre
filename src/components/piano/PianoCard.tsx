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
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  <Button variant="outline" size="icon" className="bg-white">
                    <Pencil className="h-4 w-4" />
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
        <CardHeader>
          <CardTitle className="text-xl">{piano.name}</CardTitle>
          <CardDescription className="text-lg font-semibold text-primary">
            ${piano.price.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {piano.manufacturer && (
              <p className="text-sm">
                <span className="font-semibold">Manufacturer:</span> {piano.manufacturer}
              </p>
            )}
            {piano.model_year && (
              <p className="text-sm">
                <span className="font-semibold">Model Year:</span> {piano.model_year}
              </p>
            )}
            <p className="text-gray-600">{piano.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {piano.type && (
                <p>
                  <span className="font-semibold">Category:</span> {piano.type}
                </p>
              )}
              {piano.condition && (
                <p>
                  <span className="font-semibold">Condition:</span> {piano.condition}
                </p>
              )}
              {piano.finish && (
                <p>
                  <span className="font-semibold">Finish:</span> {piano.finish}
                </p>
              )}
              {piano.keyboard_keys && (
                <p>
                  <span className="font-semibold">Keys:</span> {piano.keyboard_keys}
                </p>
              )}
              {piano.pedals && (
                <p>
                  <span className="font-semibold">Pedals:</span> {piano.pedals}
                </p>
              )}
            </div>
            {(piano.width_cm || piano.height_cm || piano.depth_cm) && (
              <div className="text-sm">
                <p className="font-semibold mb-1">Dimensions:</p>
                <div className="grid grid-cols-3 gap-2">
                  {piano.width_cm && (
                    <p>W: {piano.width_cm}cm</p>
                  )}
                  {piano.height_cm && (
                    <p>H: {piano.height_cm}cm</p>
                  )}
                  {piano.depth_cm && (
                    <p>D: {piano.depth_cm}cm</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Schedule a Viewing</Button>
        </CardFooter>
      </Card>

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
