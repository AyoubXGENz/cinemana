create table public.cinemana_members (
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

create trigger on_auth_user_created_cinemana_member
after insert on auth.users
for each row execute function public.handle_new_cinemana_member();
