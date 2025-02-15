import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Define types for complex JSON fields
type Proceeding = {
  date: string;
  description: string;
};

type Party = {
  name: string;
  role: string;
  contact: string;
};

export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  // Section 1: Basic Case Information
  caseNumber: text("case_number").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  petitioner: text("petitioner").notNull().default("Unknown"),
  respondent: text("respondent").notNull().default("Unknown"),
  docketedDate: timestamp("docketed_date").notNull().default(new Date()),

  // Section 2: Proceedings with dates
  courtProceedings: jsonb("court_proceedings").notNull().default([]).$type<Proceeding[]>(),

  // Section 3: Parties with contact info
  partiesInvolved: jsonb("parties_involved").notNull().default([]).$type<Party[]>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

const proceedingSchema = z.object({
  date: z.string(),
  description: z.string(),
});

const partySchema = z.object({
  name: z.string(),
  role: z.string(),
  contact: z.string(),
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
    courtProceedings: z.array(proceedingSchema),
    partiesInvolved: z.array(partySchema),
    docketedDate: z.string().transform((str) => new Date(str)),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCase = z.infer<typeof insertCaseSchema>;
export type Case = typeof cases.$inferSelect;
export type Proceeding = z.infer<typeof proceedingSchema>;
export type Party = z.infer<typeof partySchema>;