-- Add admin role for any user with email admin@pianocentre.ca
-- This will work once the user signs up normally

-- Insert admin role (will only work after user signup)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'admin@pianocentre.ca'
ON CONFLICT (user_id, role) DO NOTHING;