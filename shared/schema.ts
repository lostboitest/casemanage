import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Rest of the schema remains unchanged
export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  caseNumber: text("case_number").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  petitioner: text("petitioner").notNull(),
  respondent: text("respondent").notNull(),
  docketedDate: timestamp("docketed_date").notNull(),
  courtProceedings: jsonb("court_proceedings").$type<Proceeding[]>(),
  partiesInvolved: jsonb("parties_involved").$type<Party[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User schema validation
export const insertUserSchema = createInsertSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Types for complex fields
type Proceeding = {
  date: string;
  description: string;
};

type Party = {
  name: string;
  role: string;
  contact: string;
};

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

export type InsertCase = z.infer<typeof insertCaseSchema>;
export type Case = typeof cases.$inferSelect;
export type { Proceeding, Party };