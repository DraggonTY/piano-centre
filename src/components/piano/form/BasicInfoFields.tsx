
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
  showDescription?: boolean;
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
  showDescription = true,
}: BasicInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Piano Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter piano name"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            placeholder="e.g., Yamaha, Steinway"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modelYear">Model Year</Label>
          <Input
            id="modelYear"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
            placeholder="e.g., 2020"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Enter serial number"
        />
      </div>
      {showDescription && (
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the piano's features, condition, and any notable characteristics..."
            rows={4}
          />
        </div>
      )}
    </div>
  );
};
