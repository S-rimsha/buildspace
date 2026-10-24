import { relations, sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { progress } from "./progress";

export const lessons = pgTable("lessons", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    content: text("content").notNull(),
    videoUrl: text("video_url"),
    order: integer("order").notNull(),
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    course: one(courses, {
        fields: [lessons.courseId],
        references: [courses.id],
    }),
    progress: many(progress)
}))