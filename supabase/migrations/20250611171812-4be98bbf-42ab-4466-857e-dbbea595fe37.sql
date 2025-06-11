
-- Add new columns for multiple images and key image to the pianos table
ALTER TABLE public.pianos 
ADD COLUMN image_urls TEXT[] DEFAULT NULL,
ADD COLUMN key_image_url TEXT DEFAULT NULL;

-- Update existing records to populate image_urls array from single image_url
UPDATE public.pianos 
SET image_urls = CASE 
  WHEN image_url IS NOT NULL THEN ARRAY[image_url]
  ELSE NULL
END,
key_image_url = image_url
WHERE image_url IS NOT NULL;
