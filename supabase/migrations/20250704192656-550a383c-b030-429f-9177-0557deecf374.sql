-- Create admin user using Supabase's built-in functions
-- This will properly handle all the auth schema complexities

-- First, clean up any existing problematic admin user
DELETE FROM auth.users WHERE email = 'admin@pianocentre.ca';

-- Use Supabase's internal signup function to create admin user
SELECT auth.signup(
  'admin@pianocentre.ca',
  '123456',
  null,
  '{"email_confirm": true}'::jsonb
);

-- Get the user ID and insert admin role
WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca'
)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM admin_user
ON CONFLICT (user_id, role) DO NOTHING;

-- Create profile for the admin user
WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca'
)
INSERT INTO public.profiles (id)
SELECT id FROM admin_user
ON CONFLICT (id) DO NOTHING;