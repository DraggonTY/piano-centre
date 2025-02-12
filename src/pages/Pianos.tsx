
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/AuthProvider";

interface Piano {
  id: number;
  name: string;
  description: string | null;
  price: number;
  type: string | null;
  condition: string | null;
  image_url: string | null;
  created_at: string | null;
}

const AddPianoForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = null;

      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('piano-images')
          .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('piano-images')
          .getPublicUrl(fileName);

        image_url = publicUrl;
      }

      const { error } = await supabase.from("pianos").insert({
        name,
        description,
        price: parseFloat(price),
        type,
        condition,
        image_url,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "New piano added to inventory.",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding piano",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Model Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter detailed specifications and features..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Category</Label>
        <Input
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Grand, Upright, Digital, etc."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="condition">Condition</Label>
        <Input
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="New, Restored, Vintage, etc."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Product Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Adding..." : "Add to Inventory"}
      </Button>
    </form>
  );
};

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
            <DialogContent>
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
          <Card key={piano.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {piano.image_url && (
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={piano.image_url}
                  alt={piano.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{piano.name}</CardTitle>
              <CardDescription className="text-lg font-semibold text-primary">
                ${piano.price.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{piano.description}</p>
              {piano.type && (
                <p className="text-sm">
                  <span className="font-semibold">Category:</span> {piano.type}
                </p>
              )}
              {piano.condition && (
                <p className="text-sm">
                  <span className="font-semibold">Condition:</span>{" "}
                  {piano.condition}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule a Viewing</Button>
            </CardFooter>
          </Card>
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
