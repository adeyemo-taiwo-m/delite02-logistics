-- Add phone number columns to shipments table
alter table public.shipments 
add column if not exists sender_phone text,
add column if not exists receiver_phone text;

-- Add updated_at column to trigger automatic updates if needed (optional best practice)
-- alter table public.shipments add column updated_at timestamp with time zone default timezone('utc'::text, now()) not null;

-- Ensure RLS allows the admin page to Insert/Update these new columns
-- (The existing policies were "true" for all columns, so this should automatically work)
