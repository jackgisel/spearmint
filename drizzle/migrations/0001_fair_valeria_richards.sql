CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bank_name` text NOT NULL,
	`name` text NOT NULL,
	`close_date` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
