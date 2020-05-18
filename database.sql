CREATE DATABASE seti

CREATE TABLE "tutoriais" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "tutorial_id" int
);

ALTER TABLE "files" ADD FOREIGN KEY ("tutorial_id") REFERENCES "tutoriais" ("id");

CREATE TABLE "users" (
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

ALTER TABLE "files"
DROP CONSTRAINT files_tutorial_id_fkey,
ADD CONSTRAINT files_tutorial_id_fkey
FOREIGN KEY ("tutorial_id")
REFERENCES "tutoriais" ("id")
ON DELETE CASCADE;

-- to run seed
DELETE FROM users;

-- restart sequence auto_increment from tables ids
ALTER SEQUENCE users_id_seq RESTART WITH 1;