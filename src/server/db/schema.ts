import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";

export const posts = table("posts", {
  id: t.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  createdAt: t.text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const accounts = table("accounts", {
  id: t.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  bankName: t.text("bank_name").notNull(),
  name: t.text("name").notNull(),
  closeDate: t.text("close_date"),
  createdAt: t.text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
