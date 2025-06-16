
import { Piano } from "@/types/piano";

interface PianoSpecificationsProps {
  piano: Piano;
}

export const PianoSpecifications = ({ piano }: PianoSpecificationsProps) => {
  const specifications = [
    { label: "Manufacturer", value: piano.manufacturer },
    { label: "Model Year", value: piano.model_year },
    { label: "Type", value: piano.type },
    { label: "Finish", value: piano.finish },
    { label: "Keys", value: piano.keyboard_keys },
    { label: "Pedals", value: piano.pedals },
  ].filter(spec => spec.value);

  if (specifications.length === 0) return null;

  return (
    <div className="space-y-1">
      <h4 className="font-semibold text-sm sm:text-base">Specifications</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
        {specifications.map((spec, index) => (
          <div key={index} className="min-w-0">
            <span className="text-xs text-gray-500 block">{spec.label}</span>
            <p className="font-medium truncate">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
