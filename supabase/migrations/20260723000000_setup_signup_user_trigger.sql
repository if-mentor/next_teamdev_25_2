-- 既存の public.users を利用し、Auth のユーザー作成とプロフィール作成を
-- 同一トランザクションで行う。テーブル定義・既存データ・RLS は変更しない。
do $$
declare
  required_column_count integer;
begin
  if to_regclass('public.users') is null then
    raise exception 'public.users table does not exist';
  end if;

  select count(*)
  into required_column_count
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'users'
    and column_name = any (
      array['id', 'name', 'email', 'image_path', 'created_at', 'updated_at']
    );

  if required_column_count <> 6 then
    raise exception
      'public.users must have id, name, email, image_path, created_at and updated_at columns';
  end if;
end;
$$;

create or replace function public.insert_signup_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (
    id,
    name,
    email,
    image_path,
    created_at,
    updated_at
  )
  values (
    new.id,
    btrim(new.raw_user_meta_data ->> 'name'),
    btrim(new.email),
    null,
    now(),
    now()
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- 一般的な on_auth_user_created という名前は使わず、既存トリガーを上書きしない。
drop trigger if exists on_auth_user_created_insert_public_users on auth.users;
create trigger on_auth_user_created_insert_public_users
  after insert on auth.users
  for each row execute procedure public.insert_signup_user();
