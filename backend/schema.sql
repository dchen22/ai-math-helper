-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table if not exists
create table if not exists users (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create math_problems table
create table if not exists math_problems (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade not null,
  problem_text text not null,
  analysis jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table users enable row level security;
alter table math_problems enable row level security;

-- Create policies
create policy "Users can view their own data."
  on users for select
  using (auth.uid() = id);

create policy "Users can view their own math problems."
  on math_problems for select
  using (auth.uid() = user_id);

create policy "Users can insert their own math problems."
  on math_problems for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own math problems."
  on math_problems for update
  using (auth.uid() = user_id);
