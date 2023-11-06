create table "public"."changelog" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "title" text not null,
    "imageUrl" text not null,
    "comment" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."changelog" enable row level security;

alter table "public"."profiles" add column "bio" text;

alter table "public"."profiles" add column "location" text;

alter table "public"."profiles" add column "username" text;

CREATE UNIQUE INDEX changelog_pkey ON public.changelog USING btree (id);

CREATE UNIQUE INDEX visitors_pkey ON public.visitors USING btree (id);

alter table "public"."changelog" add constraint "changelog_pkey" PRIMARY KEY using index "changelog_pkey";

alter table "public"."visitors" add constraint "visitors_pkey" PRIMARY KEY using index "visitors_pkey";

create policy "Enable insert for authenticated users only"
on "public"."changelog"
as permissive
for insert
to service_role
with check (true);


create policy "Enable read access for all users"
on "public"."changelog"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."profiles"
as permissive
for insert
to service_role
with check (true);


create policy "Enable delete for users based on user_id"
on "public"."visitors"
as permissive
for delete
to service_role
using (true);



