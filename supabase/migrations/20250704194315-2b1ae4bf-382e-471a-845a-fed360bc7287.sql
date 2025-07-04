-- Clean up the problematic admin user and recreate properly
DELETE FROM public.user_roles WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca');
DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca');
DELETE FROM auth.identities WHERE email = 'admin@pianocentre.ca';
DELETE FROM auth.users WHERE email = 'admin@pianocentre.ca';

-- Create admin user with proper empty strings instead of NULLs
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
  banned_until,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  confirmed_at,
  invited_at,
  confirmation_sent_at,
  recovery_sent_at,
  email_change_sent_at,
  last_sign_in_at
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
  null,
  '{}',
  '{}',
  false,
  null,
  null,
  '',
  '',
  null,
  now(),
  null,
  null,
  null,
  null,
  null
);

-- Create identity record with proper provider_id
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

-- Create admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'admin@pianocentre.ca'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create profile
INSERT INTO public.profiles (id)
SELECT id FROM auth.users 
WHERE email = 'admin@pianocentre.ca'
ON CONFLICT (id) DO NOTHING;