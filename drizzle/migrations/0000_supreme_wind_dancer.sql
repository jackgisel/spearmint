CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP)
);
