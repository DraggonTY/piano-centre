
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/providers/AuthProvider";
import { AddPianoForm } from "@/components/piano/AddPianoForm";
import { PianoCard } from "@/components/piano/PianoCard";
import { PianoFilters } from "@/components/piano/PianoFilters";
import { Piano } from "@/types/piano";

const Pianos = () => {
  const { session } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  
  const category = searchParams.get("category");
  const types = searchParams.getAll("type");
  const conditions = searchParams.getAll("condition");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const { data: pianos, refetch } = useQuery({
    queryKey: ["pianos", category, types, conditions, minPrice, maxPrice],
    queryFn: async () => {
      let query = supabase
        .from("pianos")
        .select("*")
        .order("created_at", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      if (types.length > 0) {
        query = query.in("type", types);
      }

      if (conditions.length > 0) {
        query = query.in("condition", conditions);
      }

      if (minPrice) {
        query = query.gte("price", minPrice);
      }

      if (maxPrice) {
        query = query.lte("price", maxPrice);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Piano[];
    },
  });

  const handleSuccess = async () => {
    setIsDialogOpen(false);
    await refetch();
  };

  const handleDelete = async () => {
    await refetch();
  };

  const handleUpdate = async () => {
    await refetch();
  };

  const getCategoryTitle = () => {
    switch (category) {
      case "new":
        return "New Pianos";
      case "used":
        return "Used Pianos";
      case "digital":
        return "Digital Pianos";
      default:
        return "Our Collection";
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case "new":
        return "Experience the pristine sound and touch of our new piano collection.";
      case "used":
        return "Discover our selection of carefully maintained pre-owned pianos.";
      case "digital":
        return "Explore our range of advanced digital pianos with modern features.";
      default:
        return "Discover our carefully curated selection of premium pianos, from elegant grand pianos to professional digital instruments.";
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{getCategoryTitle()}</h1>
        <p className="text-lg text-gray-600">
          {getCategoryDescription()}
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <PianoFilters />
        </aside>
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pianos?.map((piano) => (
              <PianoCard 
                key={piano.id} 
                piano={piano} 
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>

          {(!pianos || pianos.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">No pianos currently match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pianos;
