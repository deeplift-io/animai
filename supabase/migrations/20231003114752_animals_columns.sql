drop policy "Enable read access for all users" on "public"."animal_types";

alter table "public"."animal_types" drop constraint "animal_types_name_key";

alter table "public"."animal_types" drop constraint "animal_types_uuid_key";

alter table "public"."breeds" drop constraint "breeds_id_key";

alter table "public"."breeds" drop constraint "breeds_name_key";

alter table "public"."animal_types" drop constraint "animal_types_pkey";

alter table "public"."breeds" drop constraint "breeds_pkey";

drop index if exists "public"."animal_types_name_key";

drop index if exists "public"."animal_types_pkey";

drop index if exists "public"."animal_types_uuid_key";

drop index if exists "public"."breeds_id_key";

drop index if exists "public"."breeds_name_key";

drop index if exists "public"."breeds_pkey";

drop table "public"."animal_types";

drop table "public"."breeds";

alter table "public"."animals" add column "age" integer;

alter table "public"."animals" add column "breed" text;

alter table "public"."animals" add column "seed_prompt" text;

alter table "public"."animals" add column "type" text;

alter table "public"."profiles" add column "onboarded_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text);

create policy "Enable authenticated users to update their own animal."
on "public"."animals"
as permissive
for update
to public
using ((auth.uid() = profile_id));


create policy "Allow user to update profile"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));



