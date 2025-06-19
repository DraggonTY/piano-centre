
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const PianoFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  
  const typeFilters = [
    { id: "grand", label: "Grand Piano" },
    { id: "upright", label: "Upright Piano" },
    { id: "digital", label: "Digital Piano" },
  ];

  const conditionFilters = [
    { id: "new", label: "New" },
    { id: "used", label: "Used" },
    { id: "restored", label: "Restored" },
  ];

  // Optimized query - only get the max price, no other data
  const { data: maxPriceData } = useQuery({
    queryKey: ["max-piano-price"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pianos")
        .select("price")
        .order("price", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data?.price || 100000;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - price range doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  useEffect(() => {
    if (maxPriceData) {
      const calculatedMaxPrice = Math.ceil(maxPriceData * 1.3);
      setMaxPrice(calculatedMaxPrice);
      setPriceRange([0, calculatedMaxPrice]);
    }
  }, [maxPriceData]);

  const handleTypeChange = (typeId: string, checked: boolean) => {
    const currentTypes = searchParams.getAll("type");
    let newTypes = checked 
      ? [...currentTypes, typeId]
      : currentTypes.filter(t => t !== typeId);
    
    if (newTypes.length > 0) {
      searchParams.delete("type");
      newTypes.forEach(type => searchParams.append("type", type));
    } else {
      searchParams.delete("type");
    }
    setSearchParams(searchParams);
  };

  const handleConditionChange = (conditionId: string, checked: boolean) => {
    const currentConditions = searchParams.getAll("condition");
    let newConditions = checked 
      ? [...currentConditions, conditionId]
      : currentConditions.filter(c => c !== conditionId);
    
    if (newConditions.length > 0) {
      searchParams.delete("condition");
      newConditions.forEach(condition => searchParams.append("condition", condition));
    } else {
      searchParams.delete("condition");
    }
    setSearchParams(searchParams);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const applyPriceFilter = () => {
    searchParams.set("minPrice", priceRange[0].toString());
    searchParams.set("maxPrice", priceRange[1].toString());
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                min={0}
                max={maxPrice}
                step={1000}
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                className="mt-6"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
              <Button onClick={applyPriceFilter} className="w-full">
                Apply Price Filter
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type">
          <AccordionTrigger>Piano Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {typeFilters.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${id}`}
                    checked={searchParams.getAll("type").includes(id)}
                    onCheckedChange={(checked) => 
                      handleTypeChange(id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`type-${id}`}>{label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger>Condition</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conditionFilters.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${id}`}
                    checked={searchParams.getAll("condition").includes(id)}
                    onCheckedChange={(checked) => 
                      handleConditionChange(id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`condition-${id}`}>{label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
