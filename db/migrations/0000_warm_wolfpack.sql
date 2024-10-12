CREATE TABLE IF NOT EXISTS "drawing" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"blueprintUrl" text NOT NULL,
	"nodes" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
