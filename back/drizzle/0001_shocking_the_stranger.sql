CREATE TABLE IF NOT EXISTS "sessionParticipations" (
	"userId" text NOT NULL,
	"sessionId" text NOT NULL,
	"confirmed" boolean,
	CONSTRAINT "sessionParticipations_userId_sessionId_pk" PRIMARY KEY("userId","sessionId")
);
--> statement-breakpoint
ALTER TABLE "searches" RENAME COLUMN "preparedTrailid" TO "preparedTrailId";--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "searches" ADD COLUMN "runnerId" text;--> statement-breakpoint
ALTER TABLE "searches" ADD COLUMN "sessionId" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "createdBy" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessionParticipations" ADD CONSTRAINT "sessionParticipations_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessionParticipations" ADD CONSTRAINT "sessionParticipations_sessionId_sessions_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dogs" ADD CONSTRAINT "dogs_humanId_users_id_fk" FOREIGN KEY ("humanId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "searches" ADD CONSTRAINT "searches_dogId_dogs_id_fk" FOREIGN KEY ("dogId") REFERENCES "public"."dogs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "searches" ADD CONSTRAINT "searches_runnerId_users_id_fk" FOREIGN KEY ("runnerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "searches" ADD CONSTRAINT "searches_preparedTrailId_trails_id_fk" FOREIGN KEY ("preparedTrailId") REFERENCES "public"."trails"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "searches" ADD CONSTRAINT "searches_runnerTrailId_trails_id_fk" FOREIGN KEY ("runnerTrailId") REFERENCES "public"."trails"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "searches" ADD CONSTRAINT "searches_dogTrailId_trails_id_fk" FOREIGN KEY ("dogTrailId") REFERENCES "public"."trails"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "searches" ADD CONSTRAINT "searches_sessionId_sessions_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "users";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "searches";