create extension if not exists "vector" with schema "public" version '0.4.0';

create sequence "public"."documents_id_seq";

create table "public"."animals" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone default now(),
    "avatar_url" text,
    "profile_id" uuid not null,
    "age" integer,
    "breed" text,
    "seed_prompt" text,
    "type" text
);


alter table "public"."animals" enable row level security;

create table "public"."conversations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "advanced_settings" jsonb,
    "history_type" text,
    "model" text,
    "owner" uuid,
    "system_prompt" text,
    "title" text
);


alter table "public"."conversations" enable row level security;

create table "public"."documents" (
    "id" bigint not null default nextval('documents_id_seq'::regclass),
    "content" text,
    "metadata" jsonb,
    "embedding" vector(1536)
);


create table "public"."messages" (
    "created_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "content" text,
    "role" text,
    "conversation" uuid,
    "owner" uuid,
    "embedding" vector,
    "token_size" integer,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."messages" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "avatar_url" text,
    "onboarded_at" timestamp with time zone,
    "fingerprint_id" text
);


alter table "public"."profiles" enable row level security;

create table "public"."visitors" (
    "fingerprint_id" character varying,
    "created_at" timestamp with time zone default now(),
    "message_allowance" smallint not null default '3'::smallint,
    "conversation_blob" jsonb[],
    "id" uuid not null default gen_random_uuid()
);


alter sequence "public"."documents_id_seq" owned by "public"."documents"."id";

CREATE UNIQUE INDEX animals_pkey ON public.animals USING btree (id);

CREATE UNIQUE INDEX conversations_pkey ON public.conversations USING btree (id);

CREATE UNIQUE INDEX documents_pkey ON public.documents USING btree (id);

CREATE UNIQUE INDEX messages_id_key ON public.messages USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX profiles_fingerprint_id_key ON public.profiles USING btree (fingerprint_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX visitors_fingerprint_id_key ON public.visitors USING btree (fingerprint_id);

CREATE UNIQUE INDEX visitors_uuid_key ON public.visitors USING btree (id);

alter table "public"."animals" add constraint "animals_pkey" PRIMARY KEY using index "animals_pkey";

alter table "public"."conversations" add constraint "conversations_pkey" PRIMARY KEY using index "conversations_pkey";

alter table "public"."documents" add constraint "documents_pkey" PRIMARY KEY using index "documents_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."animals" add constraint "animals_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."animals" validate constraint "animals_profile_id_fkey";

alter table "public"."conversations" add constraint "conversations_owner_fkey" FOREIGN KEY (owner) REFERENCES profiles(id) not valid;

alter table "public"."conversations" validate constraint "conversations_owner_fkey";

alter table "public"."messages" add constraint "messages_conversation_fkey" FOREIGN KEY (conversation) REFERENCES conversations(id) not valid;

alter table "public"."messages" validate constraint "messages_conversation_fkey";

alter table "public"."messages" add constraint "messages_id_key" UNIQUE using index "messages_id_key";

alter table "public"."messages" add constraint "messages_owner_fkey" FOREIGN KEY (owner) REFERENCES profiles(id) not valid;

alter table "public"."messages" validate constraint "messages_owner_fkey";

alter table "public"."profiles" add constraint "profiles_fingerprint_id_key" UNIQUE using index "profiles_fingerprint_id_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."visitors" add constraint "visitors_fingerprint_id_key" UNIQUE using index "visitors_fingerprint_id_key";

alter table "public"."visitors" add constraint "visitors_uuid_key" UNIQUE using index "visitors_uuid_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_profile_for_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
insert into public.profiles(id,name,avatar_url)
values(
  new.id,
  new.raw_user_meta_data->>'name',
  new.raw_user_meta_data->>'avatar_url'
);
return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.match_documents(query_embedding vector, match_count integer DEFAULT NULL::integer, filter jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(id bigint, content text, metadata jsonb, similarity double precision)
 LANGUAGE plpgsql
AS $function$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$function$
;

create policy "Enable authenticated users to update their own animal."
on "public"."animals"
as permissive
for update
to public
using ((auth.uid() = profile_id));


create policy "Enable insert for authenticated users only"
on "public"."animals"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users"
on "public"."animals"
as permissive
for select
to authenticated
using (true);


create policy "Authed users can update conversations"
on "public"."conversations"
as permissive
for update
to authenticated, service_role
using (true);


create policy "Enable read for authenticated users only"
on "public"."conversations"
as permissive
for select
to authenticated
using (true);


create policy "Allow user to update profile"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "enable read access for profiles"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Allow anons to update visitors table"
on "public"."visitors"
as permissive
for update
to anon
using (true);


create policy "Enable insert for anon users only"
on "public"."visitors"
as permissive
for insert
to anon
with check (true);


create policy "Enable read access for all users"
on "public"."visitors"
as permissive
for select
to public
using (true);



