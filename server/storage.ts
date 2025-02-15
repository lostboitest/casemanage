import { cases, users, type User, type InsertUser, type Case, type InsertCase } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import { MemoryStore } from "memorystore";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getCases(): Promise<Case[]>;
  getCase(id: number): Promise<Case | undefined>;
  getCaseByNumber(caseNumber: string): Promise<Case | undefined>;
  createCase(caseData: InsertCase): Promise<Case>;
  updateCase(id: number, caseData: Partial<InsertCase>): Promise<Case>;
  deleteCase(id: number): Promise<void>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Use MemoryStore for sessions to avoid PostgreSQL connection issues
    const MemorySessionStore = MemoryStore(session);
    this.sessionStore = new MemorySessionStore();
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async getCases(): Promise<Case[]> {
    try {
      return await db.select().from(cases);
    } catch (error) {
      console.error('Error fetching cases:', error);
      return [];
    }
  }

  async getCase(id: number): Promise<Case | undefined> {
    try {
      const [case_] = await db.select().from(cases).where(eq(cases.id, id));
      return case_;
    } catch (error) {
      console.error('Error fetching case:', error);
      return undefined;
    }
  }

  async getCaseByNumber(caseNumber: string): Promise<Case | undefined> {
    try {
      const [case_] = await db.select().from(cases).where(eq(cases.caseNumber, caseNumber));
      return case_;
    } catch (error) {
      console.error('Error fetching case by number:', error);
      return undefined;
    }
  }

  async createCase(caseData: InsertCase): Promise<Case> {
    try {
      const [case_] = await db.insert(cases).values(caseData).returning();
      return case_;
    } catch (error) {
      console.error('Error creating case:', error);
      throw new Error('Failed to create case');
    }
  }

  async updateCase(id: number, caseData: Partial<InsertCase>): Promise<Case> {
    try {
      const [case_] = await db
        .update(cases)
        .set({ ...caseData, updatedAt: new Date() })
        .where(eq(cases.id, id))
        .returning();

      if (!case_) {
        throw new Error("Case not found");
      }

      return case_;
    } catch (error) {
      console.error('Error updating case:', error);
      throw new Error('Failed to update case');
    }
  }

  async deleteCase(id: number): Promise<void> {
    try {
      await db.delete(cases).where(eq(cases.id, id));
    } catch (error) {
      console.error('Error deleting case:', error);
      throw new Error('Failed to delete case');
    }
  }
}

export const storage = new DatabaseStorage();