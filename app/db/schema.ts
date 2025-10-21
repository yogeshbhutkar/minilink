import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
	id: serial("id").primaryKey(),
	longUrl: text("long_url").notNull(),
	shortCode: text("short_code").notNull().unique(),
});
