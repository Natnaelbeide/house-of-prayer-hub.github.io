CREATE TABLE public.chain_prayer_slots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hour smallint NOT NULL CHECK (hour >= 0 AND hour <= 23),
  full_name text NOT NULL CHECK (length(trim(full_name)) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (length(trim(email)) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR length(trim(phone)) BETWEEN 5 AND 30),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (hour, email)
);

GRANT ALL ON public.chain_prayer_slots TO service_role;

ALTER TABLE public.chain_prayer_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chain prayer sign-ups remain private" ON public.chain_prayer_slots FOR SELECT TO anon, authenticated USING (false);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_chain_prayer_slots_updated_at
BEFORE UPDATE ON public.chain_prayer_slots
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.chain_prayer_slot_summary()
RETURNS TABLE (hour smallint, participant_count bigint, first_names text[])
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.hour,
         count(*) AS participant_count,
         array_agg(split_part(trim(s.full_name), ' ', 1) ORDER BY s.created_at) AS first_names
  FROM public.chain_prayer_slots s
  GROUP BY s.hour
$$;

GRANT EXECUTE ON FUNCTION public.chain_prayer_slot_summary() TO anon, authenticated, service_role;