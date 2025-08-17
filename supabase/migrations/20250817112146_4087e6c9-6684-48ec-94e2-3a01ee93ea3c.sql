-- Make first registered user an admin automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  make_admin boolean;
BEGIN
  -- If no admin exists yet, the first user becomes admin
  SELECT NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') INTO make_admin;

  INSERT INTO public.profiles (user_id, email, role, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN make_admin THEN 'admin' ELSE 'user' END,
    NEW.raw_user_meta_data->>'display_name'
  );

  RETURN NEW;
END;
$$;

-- One-time fix: ensure there's at least one admin (the earliest profile)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
    UPDATE public.profiles p
    SET role = 'admin'
    WHERE p.id = (
      SELECT id FROM public.profiles ORDER BY created_at ASC LIMIT 1
    );
  END IF;
END $$;