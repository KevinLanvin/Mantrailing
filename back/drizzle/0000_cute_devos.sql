CREATE TABLE IF NOT EXISTS "dogs" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"humanId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friendships" (
	"senderId" text NOT NULL,
	"invitedId" text NOT NULL,
	"confirmed" boolean,
	CONSTRAINT "friendships_senderId_invitedId_pk" PRIMARY KEY("senderId","invitedId")
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
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"authorizationKey" text,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendships" ADD CONSTRAINT "friendships_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendships" ADD CONSTRAINT "friendships_invitedId_users_id_fk" FOREIGN KEY ("invitedId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
