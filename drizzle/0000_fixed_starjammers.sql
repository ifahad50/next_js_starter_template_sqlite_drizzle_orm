CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text,
	`email` text NOT NULL,
	`password` text,
	`text_modifiers` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`int_modifiers` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);