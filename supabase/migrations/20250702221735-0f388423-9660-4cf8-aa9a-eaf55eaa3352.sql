
-- Insert admin user into auth.users table
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
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@pianocentre.ca',
  crypt('1234', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated',
  '',
  '',
  ''
);

-- Get the user ID and insert admin role
WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca'
)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM admin_user;

-- Create profile for the admin user
WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca'
)
INSERT INTO public.profiles (id)
SELECT id FROM admin_user;
