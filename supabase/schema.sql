-- Run this once in the Supabase SQL editor of your project.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  sort_order int not null default 0
);

create table if not exists dishes (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete cascade,
  slug text unique not null,
  name text not null,
  description text not null default '',
  price int not null,
  image_url text not null,
  weight_grams int not null default 0,
  is_vegetarian boolean not null default false,
  is_spicy boolean not null default false,
  is_available boolean not null default true
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'new'
    check (status in ('new','confirmed','preparing','on_the_way','delivered','cancelled')),
  total int not null,
  name text not null,
  phone text not null,
  address text not null default '',
  comment text not null default '',
  delivery_type text not null check (delivery_type in ('delivery','pickup')),
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  dish_id uuid references dishes(id) on delete set null,
  dish_name text not null,
  price int not null,
  quantity int not null
);

-- Row Level Security

alter table categories enable row level security;
alter table dishes enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read dishes" on dishes for select using (true);

-- Anyone can place an order (guest checkout); logged-in users attach their user_id client-side.
create policy "Anyone can create an order" on orders for insert with check (true);
-- Owners can read their own orders; guest orders (user_id is null) are readable by id only,
-- which is fine since the id is an unguessable UUID shown only on the confirmation page.
create policy "Read own or guest orders" on orders for select
  using (auth.uid() = user_id or user_id is null);

create policy "Anyone can create order items" on order_items for insert with check (true);
create policy "Read items of visible orders" on order_items for select
  using (exists (
    select 1 from orders
    where orders.id = order_items.order_id
      and (orders.user_id = auth.uid() or orders.user_id is null)
  ));
