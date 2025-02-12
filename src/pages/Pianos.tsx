
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/providers/AuthProvider";
import { AddPianoForm } from "@/components/piano/AddPianoForm";
import { PianoCard } from "@/components/piano/PianoCard";
import { Piano } from "@/types/piano";

const Pianos = () => {
  const { session } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: pianos, refetch } = useQuery({
    queryKey: ["pianos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pianos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Piano[];
    },
  });

  const handleSuccess = () => {
    setIsDialogOpen(false);
    refetch();
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
        <p className="text-lg text-gray-600">
          Discover our carefully curated selection of premium pianos, from elegant grand pianos
          to professional digital instruments.
        </p>
      </div>

      {session && (
        <div className="mb-12 text-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add New Piano</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Piano to Inventory</DialogTitle>
              </DialogHeader>
              <AddPianoForm onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pianos?.map((piano) => (
          <PianoCard key={piano.id} piano={piano} />
        ))}
      </div>

      {(!pianos || pianos.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-500">No pianos currently in stock. Please check back soon.</p>
        </div>
      )}
    </div>
  );
};

export default Pianos;
