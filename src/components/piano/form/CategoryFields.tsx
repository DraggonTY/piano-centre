
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryFieldsProps {
  category: string;
  setCategory: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  condition: string;
  setCondition: (value: string) => void;
  finish: string;
  setFinish: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
}

export const CategoryFields = ({
  category,
  setCategory,
  type,
  setType,
  condition,
  setCondition,
  finish,
  setFinish,
  price,
  setPrice,
}: CategoryFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="price">Price *</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Grand, Upright, Digital, etc."
          />
        </div>
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
        <Label htmlFor="finish">Finish</Label>
        <Input
          id="finish"
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
          placeholder="e.g., Polished Ebony"
        />
      </div>
    </>
  );
};
