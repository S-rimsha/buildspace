import { pgTable, text, timestamp, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";
import { courses } from "./courses";

export const enrollments = pgTable("enrollments", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
    completed: boolean("completed").default(false).notNull(),
    conpletedAt: timestamp("completed_at")
})