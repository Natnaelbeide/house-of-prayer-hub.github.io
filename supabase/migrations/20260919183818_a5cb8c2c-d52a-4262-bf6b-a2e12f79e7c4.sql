ALTER TABLE public.chain_prayer_slots
  ADD COLUMN reminders_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN last_reminded_at timestamp with time zone;