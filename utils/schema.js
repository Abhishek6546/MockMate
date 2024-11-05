import { serial, varchar, text } from "drizzle-orm/pg-core"; // Use pg-core for Postgres
import { pgTable } from "drizzle-orm/pg-core";

export const MockMate = pgTable('mockInterview',
    {
        id: serial('id').primaryKey(),
        jsonMockResp: text('jsonMockResp').notNull(),  // No length needed for text in Postgres
        jobPosition: varchar('jobPosition', 255).notNull(),  // Specify length for varchar
        jobDesc: varchar('jobDesc', 255).notNull(),  // Specify length for varchar
        jobExperience: varchar('jobExperience', 255).notNull(),  // Specify length for varchar
        createdBy: varchar('createdBy', 255).notNull(),  // Specify length for varchar
        createdAt: varchar('createdAt', 255).notNull(),  // Specify length for varchar
        mockId: varchar('mockId', 255).notNull()  // Specify length for varchar
    }
);

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns').notNull(),
    userAns: text('userAns').notNull(),
    feedback: text('feedback').notNull(),
    rating: varchar('rating').notNull(),
    userEmail: varchar('userEmail').notNull(),
    createdAt: varchar('createdAt').notNull(),
});

