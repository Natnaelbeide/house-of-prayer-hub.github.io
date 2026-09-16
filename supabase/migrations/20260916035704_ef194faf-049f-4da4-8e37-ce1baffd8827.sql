CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL CHECK (length(trim(full_name)) BETWEEN 1 AND 100),
  email TEXT CHECK (email IS NULL OR length(trim(email)) BETWEEN 3 AND 255),
  phone TEXT CHECK (phone IS NULL OR length(trim(phone)) BETWEEN 7 AND 30),
  request TEXT NOT NULL CHECK (length(trim(request)) BETWEEN 1 AND 2000),
  is_private BOOLEAN NOT NULL DEFAULT true,
  follow_up_requested BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.prayer_requests TO anon;
GRANT INSERT ON public.prayer_requests TO authenticated;
GRANT ALL ON public.prayer_requests TO service_role;

ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a prayer request"
ON public.prayer_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(full_name)) BETWEEN 1 AND 100
  AND (email IS NULL OR length(trim(email)) BETWEEN 3 AND 255)
  AND (phone IS NULL OR length(trim(phone)) BETWEEN 7 AND 30)
  AND length(trim(request)) BETWEEN 1 AND 2000
);