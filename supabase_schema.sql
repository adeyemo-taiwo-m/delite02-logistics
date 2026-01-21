-- Create shipments table
create table public.shipments (
  id uuid default gen_random_uuid() primary key,
  tracking_number text not null unique,
  sender_name text not null,
  receiver_name text not null,
  origin text not null,
  destination text not null,
  current_status text not null, -- e.g. 'In Transit', 'Delivered', 'Pending'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tracking_events table
create table public.tracking_events (
  id uuid default gen_random_uuid() primary key,
  shipment_id uuid references public.shipments(id) on delete cascade not null,
  status text not null, -- e.g. 'Package received at facility', 'Out for delivery'
  location text not null,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.shipments enable row level security;
alter table public.tracking_events enable row level security;

-- Create policies to allow anyone to read tracking data (for public tracking page)
-- You may want to restrict this further in production (e.g. only allow by specific tracking number lookup if using stored procedures, but for direct client query this is needed)
create policy "Enable read access for all users" on public.shipments for select using (true);
create policy "Enable read access for all users" on public.tracking_events for select using (true);

-- Example Data (Optional - Run to test)
/*
insert into public.shipments (tracking_number, sender_name, receiver_name, origin, destination, current_status)
values ('TRK-123456789', 'John Doe', 'Jane Smith', 'New York, USA', 'London, UK', 'In Transit');

do $$
declare
  shipment_id uuid;
begin
  select id into shipment_id from public.shipments where tracking_number = 'TRK-123456789';

  insert into public.tracking_events (shipment_id, status, location, created_at)
  values 
  (shipment_id, 'Shipment Created', 'New York, USA', now() - interval '2 days'),
  (shipment_id, 'Picked up by courier', 'New York, USA', now() - interval '1 day'),
  (shipment_id, 'Departed facility', 'JFK Airport, NY', now() - interval '12 hours');
end $$;
*/
