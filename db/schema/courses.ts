import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { enrollments } from "./enrollments";
import { lessons } from "./lessons";

export const courses = pgTable("courses", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    description: text("description").notNull(),
    thumbnail: text("thumbnail"),
    duration: integer("duration").notNull(),
    points: integer("points").default(100).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const coursesRelation = relations(courses, ({ many }) => ({
    lessons: many(lessons),
    enrollments: many(enrollments),
}))