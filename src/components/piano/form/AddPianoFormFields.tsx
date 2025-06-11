
import { BasicInfoFields } from "./BasicInfoFields";
import { MultipleImageUploadField } from "./MultipleImageUploadField";
import { CategoryFields } from "./CategoryFields";
import { DimensionsFields } from "./DimensionsFields";

interface AddPianoFormFieldsProps {
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
  images: File[];
  keyImageIndex: number;
  onImagesChange: (images: File[]) => void;
  onKeyImageChange: (index: number) => void;
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
  width: string;
  setWidth: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  depth: string;
  setDepth: (value: string) => void;
  keys: string;
  setKeys: (value: string) => void;
  pedals: string;
  setPedals: (value: string) => void;
}

export const AddPianoFormFields = ({
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
  images,
  keyImageIndex,
  onImagesChange,
  onKeyImageChange,
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
  width,
  setWidth,
  height,
  setHeight,
  depth,
  setDepth,
  keys,
  setKeys,
  pedals,
  setPedals,
}: AddPianoFormFieldsProps) => {
  return (
    <>
      <BasicInfoFields
        name={name}
        setName={setName}
        manufacturer={manufacturer}
        setManufacturer={setManufacturer}
        modelYear={modelYear}
        setModelYear={setModelYear}
        serialNumber={serialNumber}
        setSerialNumber={setSerialNumber}
        description={description}
        setDescription={setDescription}
        showDescription={false}
      />
      <MultipleImageUploadField
        images={images}
        keyImageIndex={keyImageIndex}
        onImagesChange={onImagesChange}
        onKeyImageChange={onKeyImageChange}
      />
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the piano's features, condition, and any notable characteristics..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <CategoryFields
        category={category}
        setCategory={setCategory}
        type={type}
        setType={setType}
        condition={condition}
        setCondition={setCondition}
        finish={finish}
        setFinish={setFinish}
        price={price}
        setPrice={setPrice}
      />
      <DimensionsFields
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        depth={depth}
        setDepth={setDepth}
        keys={keys}
        setKeys={setKeys}
        pedals={pedals}
        setPedals={setPedals}
      />
    </>
  );
};
