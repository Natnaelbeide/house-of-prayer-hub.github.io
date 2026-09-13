CREATE TABLE public.ministry_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.ministry_registrations TO anon;
GRANT INSERT ON public.ministry_registrations TO authenticated;
GRANT ALL ON public.ministry_registrations TO service_role;

ALTER TABLE public.ministry_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a registration"
ON public.ministry_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(full_name)) BETWEEN 1 AND 100
  AND length(trim(email)) BETWEEN 3 AND 255
  AND length(trim(phone)) BETWEEN 5 AND 30
  AND (notes IS NULL OR length(notes) <= 1000)
);