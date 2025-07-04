-- Fix admin user creation with proper identity provider_id
-- First, clean up any existing problematic admin user
DELETE FROM auth.users WHERE email = 'admin@pianocentre.ca';
DELETE FROM auth.identities WHERE email = 'admin@pianocentre.ca';

-- Create admin user with only required columns (avoiding generated columns)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud,
  confirmation_token,
  email_change_token_new,
  recovery_token,
  email_change,
  email_change_token_current,
  email_change_confirm_status,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@pianocentre.ca',
  crypt('123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated',
  '',
  '',
  '',
  '',
  '',
  0,
  '{}',
  '{}',
  false
);

-- Create identity record for the admin user with proper provider_id
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at,
  email
) 
SELECT 
  id::text,
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  now(),
  now(),
  now(),
  email
FROM auth.users 
WHERE email = 'admin@pianocentre.ca';

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