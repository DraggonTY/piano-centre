
import { Button } from "@/components/ui/button";
import { Piano } from "@/types/piano";
import { useAddPianoForm } from "./form/AddPianoFormLogic";
import { AddPianoFormFields } from "./form/AddPianoFormFields";

interface AddPianoFormProps {
  onSuccess: () => void;
  initialData?: Piano;
}

export const AddPianoForm = ({ onSuccess, initialData }: AddPianoFormProps) => {
  const formLogic = useAddPianoForm(onSuccess, initialData);

  return (
    <form onSubmit={formLogic.handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto px-4">
      <AddPianoFormFields
        name={formLogic.name}
        setName={formLogic.setName}
        manufacturer={formLogic.manufacturer}
        setManufacturer={formLogic.setManufacturer}
        modelYear={formLogic.modelYear}
        setModelYear={formLogic.setModelYear}
        serialNumber={formLogic.serialNumber}
        setSerialNumber={formLogic.setSerialNumber}
        description={formLogic.description}
        setDescription={formLogic.setDescription}
        images={formLogic.images}
        keyImageIndex={formLogic.keyImageIndex}
        onImagesChange={formLogic.setImages}
        onKeyImageChange={formLogic.setKeyImageIndex}
        category={formLogic.category}
        setCategory={formLogic.setCategory}
        type={formLogic.type}
        setType={formLogic.setType}
        condition={formLogic.condition}
        setCondition={formLogic.setCondition}
        finish={formLogic.finish}
        setFinish={formLogic.setFinish}
        price={formLogic.price}
        setPrice={formLogic.setPrice}
        width={formLogic.width}
        setWidth={formLogic.setWidth}
        height={formLogic.height}
        setHeight={formLogic.setHeight}
        depth={formLogic.depth}
        setDepth={formLogic.setDepth}
        keys={formLogic.keys}
        setKeys={formLogic.setKeys}
        pedals={formLogic.pedals}
        setPedals={formLogic.setPedals}
      />
      <Button type="submit" className="w-full" disabled={formLogic.loading}>
        {formLogic.loading ? (formLogic.initialData ? "Updating..." : "Adding...") : (formLogic.initialData ? "Update Piano" : "Add to Inventory")}
      </Button>
    </form>
  );
};
