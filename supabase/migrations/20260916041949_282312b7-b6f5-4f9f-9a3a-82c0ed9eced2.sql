REVOKE SELECT ON public.ministry_registrations FROM anon, authenticated;
REVOKE SELECT ON public.prayer_requests FROM anon, authenticated;

CREATE POLICY "Registration submissions remain private"
ON public.ministry_registrations
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Prayer requests remain private"
ON public.prayer_requests
FOR SELECT
TO anon, authenticated
USING (false);