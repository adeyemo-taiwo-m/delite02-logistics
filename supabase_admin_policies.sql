-- Create policies to allow inserts/updates for anyone (TEMPORARY - FOR DEMO ONLY)
-- In a real app, you would use authenticated users (Supabase Auth)
create policy "Enable insert for all users" on public.shipments for insert with check (true);
create policy "Enable update for all users" on public.shipments for update using (true);

create policy "Enable insert for all users" on public.tracking_events for insert with check (true);
create policy "Enable update for all users" on public.tracking_events for update using (true);
