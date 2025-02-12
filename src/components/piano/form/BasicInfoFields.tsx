
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoFieldsProps {
  name: string;
  setName: (value: string) => void;
  manufacturer: string;
  setManufacturer: (value: string) => void;
  modelYear: string;
  setModelYear: (value: string) => void;
  serialNumber: string;
  setSerialNumber: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export const BasicInfoFields = ({
  name,
  setName,
  manufacturer,
  setManufacturer,
  modelYear,
  setModelYear,
  serialNumber,
  setSerialNumber,
  description,
  setDescription,
}: BasicInfoFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Model Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="manufacturer">Manufacturer</Label>
        <Input
          id="manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          placeholder="e.g., Steinway & Sons"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="modelYear">Model Year</Label>
          <Input
            id="modelYear"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
            placeholder="e.g., 2021"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
        </div>
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
    </>
  );
};
