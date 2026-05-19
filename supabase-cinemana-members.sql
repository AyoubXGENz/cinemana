create table if not exists public.cinemana_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references auth.users(id) on delete cascade,
  full_name text not null,
  birthday date not null,
  city text not null,
  phone text not null,
  email text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.cinemana_members enable row level security;

drop policy if exists "Members can read own profile" on public.cinemana_members;

create policy "Members can read own profile"
on public.cinemana_members
for select
using (auth.uid() = user_id);

create or replace function public.handle_new_cinemana_member()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.cinemana_members (
    user_id,
    full_name,
    birthday,
    city,
    phone,
    email
  )
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'birthday')::date,
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'phone',
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_cinemana_member on auth.users;

create trigger on_auth_user_created_cinemana_member
after insert on auth.users
for each row execute function public.handle_new_cinemana_member();

insert into public.cinemana_members (
  user_id,
  full_name,
  birthday,
  city,
  phone,
  email
)
select
  users.id,
  users.raw_user_meta_data->>'full_name',
  (users.raw_user_meta_data->>'birthday')::date,
  users.raw_user_meta_data->>'city',
  users.raw_user_meta_data->>'phone',
  users.email
from auth.users
where users.raw_user_meta_data ? 'full_name'
  and users.raw_user_meta_data ? 'birthday'
  and users.raw_user_meta_data ? 'city'
  and users.raw_user_meta_data ? 'phone'
  and nullif(users.raw_user_meta_data->>'birthday', '') is not null
on conflict (user_id) do nothing;
