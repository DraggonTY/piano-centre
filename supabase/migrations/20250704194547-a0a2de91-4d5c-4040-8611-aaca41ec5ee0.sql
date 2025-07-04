-- Complete cleanup of any admin user remnants
DELETE FROM public.user_roles WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca'
);

DELETE FROM public.profiles WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'admin@pianocentre.ca'
);

DELETE FROM auth.identities WHERE email = 'admin@pianocentre.ca';

DELETE FROM auth.users WHERE email = 'admin@pianocentre.ca';