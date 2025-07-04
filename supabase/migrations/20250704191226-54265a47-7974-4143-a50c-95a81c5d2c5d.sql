-- Check and fix any constraint issues with user_roles table
-- First, let's ensure the table structure is correct
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_role_key;

-- Add the constraint back properly  
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);