import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  caseNumber: text("case_number").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  petitioner: text("petitioner").notNull().default("Unknown"),
  respondent: text("respondent").notNull().default("Unknown"),
  docketedDate: timestamp("docketed_date").notNull().default(new Date()),
  courtProceedings: jsonb("court_proceedings").notNull().default([]),
  partiesInvolved: jsonb("parties_involved").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCaseSchema = createInsertSchema(cases)
  .pick({
    caseNumber: true,
    title: true,
    description: true,
    status: true,
    petitioner: true,
    respondent: true,
    docketedDate: true,
    courtProceedings: true,
    partiesInvolved: true,
  })
  .extend({
    status: z.enum(["open", "closed", "pending"]),
    courtProceedings: z.array(z.string()),
    partiesInvolved: z.array(z.string()),
    docketedDate: z.string().transform((str) => new Date(str)),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCase = z.infer<typeof insertCaseSchema>;
export type Case = typeof cases.$inferSelect;