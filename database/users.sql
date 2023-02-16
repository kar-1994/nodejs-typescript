DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "user_id" int4 NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    "username" varchar(50) NOT NULL,
    "password" varchar(50) NOT NULL,
    "email" varchar(255) NOT NULL,
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."users" ("user_id", "username", "password", "email") VALUES
(1, 'DeviKar', '1263', 'd.arch@gmail.com');