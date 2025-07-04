-- Add admin role to the admin user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'admin@pianocentre.ca'
ON CONFLICT (user_id, role) DO NOTHING;