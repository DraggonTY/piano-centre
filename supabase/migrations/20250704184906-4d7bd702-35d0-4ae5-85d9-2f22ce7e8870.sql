-- Update admin user password
UPDATE auth.users 
SET encrypted_password = crypt('123456', gen_salt('bf'))
WHERE email = 'admin@pianocentre.ca';