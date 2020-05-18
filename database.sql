CREATE DATABASE seti

CREATE TABLE "tutorial" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "tutorial_id" int
);

ALTER TABLE "file" ADD FOREIGN KEY ("tutorial_id") REFERENCES "tutorial" ("id");

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "type" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text
);

--create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--auto updated_at tutoriais
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON tutoriais
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp()

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "file"
DROP CONSTRAINT file_tutorial_id_fkey,
ADD CONSTRAINT file_tutorial_id_fkey
FOREIGN KEY ("tutorial_id")
REFERENCES "tutorial" ("id")
ON DELETE CASCADE;

-- to run seed
DELETE FROM users;

-- restart sequence auto_increment from tables ids
ALTER SEQUENCE user_id_seq RESTART WITH 1;