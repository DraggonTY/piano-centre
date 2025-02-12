
export interface Piano {
  id: number;
  name: string;
  description: string | null;
  price: number;
  type: string | null;
  condition: string | null;
  image_url: string | null;
  created_at: string | null;
  manufacturer: string | null;
  model_year: string | null;
  serial_number: string | null;
  width_cm: number | null;
  height_cm: number | null;
  depth_cm: number | null;
  keyboard_keys: number | null;
  pedals: number | null;
  finish: string | null;
}
