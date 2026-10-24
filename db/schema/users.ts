//import { timeStamp } from "console";
import { relations, sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { userAchievements } from "./achievements";
import { enrollments } from "./enrollments";
import { progress } from "./progress";

export const users = pgTable("users", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    clerkId: text("clerk_id").notNull().unique(),
    email: text("email").notNull().unique(),
    name: text("name"),
    username: text("username").unique(),
    avatarUrl: text("avatarUrl"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    points: integer("points").default(0).notNull(),
    level: integer("level").default(1).notNull(),
    currentStreak: integer("currentStreak").default(0).notNull(),
    longestStreak: integer("longestStreak").default(0).notNull(),
    lastActive: timestamp("last_active"),
}, (table) => {
    return {
        clerkidIdx: uniqueIndex("clerk_id_idx").on(table.clerkId),
        emailIdx: uniqueIndex("email_idx").on(table.email),
        usernameIdx: uniqueIndex("username_idx").on(table.username)
    }
}
)

