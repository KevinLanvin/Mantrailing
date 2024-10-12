CREATE TABLE IF NOT EXISTS "friendshipInvitations" (
	"senderId" text NOT NULL,
	"invitedId" text NOT NULL,
	CONSTRAINT "friendshipInvitations_senderId_invitedId_pk" PRIMARY KEY("senderId","invitedId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendshipInvitations" ADD CONSTRAINT "friendshipInvitations_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendshipInvitations" ADD CONSTRAINT "friendshipInvitations_invitedId_users_id_fk" FOREIGN KEY ("invitedId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
