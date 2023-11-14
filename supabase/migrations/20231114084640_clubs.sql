create table "public"."clubs" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "insta" text,
    "linkedin" text
);


alter table "public"."clubs" enable row level security;

alter table "public"."users" add column "club_id" bigint;

CREATE UNIQUE INDEX clubs_pkey ON public.clubs USING btree (id);

alter table "public"."clubs" add constraint "clubs_pkey" PRIMARY KEY using index "clubs_pkey";

alter table "public"."users" add constraint "users_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_club_id_fkey";


