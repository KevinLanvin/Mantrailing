CREATE TABLE IF NOT EXISTS "dogs" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"humanId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "searches" (
	"id" text PRIMARY KEY NOT NULL,
	"dogId" text,
	"preparedTrailid" text,
	"runnerTrailId" text,
	"dogTrailId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"date" date,
	"users" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"searches" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trails" (
	"id" text PRIMARY KEY NOT NULL,
	"path" json NOT NULL,
	"startTimestamp" timestamp with time zone,
	"endTimestamp" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "friends" text[] DEFAULT ARRAY[]::text[] NOT NULL;