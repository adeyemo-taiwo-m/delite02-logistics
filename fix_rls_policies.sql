-- FIX RLS POLICIES (Run this to fix the "row violates row-level security" error)

-- 1. Drop existing policies to ensure a clean slate and avoid conflicts
drop policy if exists "Enable read access for all users" on public.shipments;
drop policy if exists "Enable insert for all users" on public.shipments;
drop policy if exists "Enable update for all users" on public.shipments;
drop policy if exists "Enable all access for shipments" on public.shipments;

drop policy if exists "Enable read access for all users" on public.tracking_events;
drop policy if exists "Enable insert for all users" on public.tracking_events;
drop policy if exists "Enable update for all users" on public.tracking_events;
drop policy if exists "Enable all access for tracking_events" on public.tracking_events;

-- 2. Create a single "ALLOW ALL" policy for shipments
-- This allows Select, Insert, Update, and Delete for everyone (ideal for this admin demo)
create policy "Enable all access for shipments"
on public.shipments
for all
using (true)
with check (true);

-- 3. Create a single "ALLOW ALL" policy for tracking_events
create policy "Enable all access for tracking_events"
on public.tracking_events
for all
using (true)
with check (true);
