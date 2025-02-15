import { cases, users, type User, type InsertUser, type Case, type InsertCase } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cases: Map<number, Case>;
  sessionStore: session.Store;
  currentUserId: number;
  currentCaseId: number;

  constructor() {
    this.users = new Map();
    this.cases = new Map();
    this.currentUserId = 1;
    this.currentCaseId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCases(): Promise<Case[]> {
    return Array.from(this.cases.values());
  }

  async getCase(id: number): Promise<Case | undefined> {
    return this.cases.get(id);
  }

  async getCaseByNumber(caseNumber: string): Promise<Case | undefined> {
    return Array.from(this.cases.values()).find(
      (c) => c.caseNumber === caseNumber,
    );
  }

  async createCase(caseData: InsertCase): Promise<Case> {
    const id = this.currentCaseId++;
    const now = new Date();
    const newCase: Case = {
      ...caseData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.cases.set(id, newCase);
    return newCase;
  }

  async updateCase(id: number, caseData: Partial<InsertCase>): Promise<Case> {
    const existingCase = await this.getCase(id);
    if (!existingCase) {
      throw new Error("Case not found");
    }
    const updatedCase: Case = {
      ...existingCase,
      ...caseData,
      updatedAt: new Date(),
    };
    this.cases.set(id, updatedCase);
    return updatedCase;
  }

  async deleteCase(id: number): Promise<void> {
    this.cases.delete(id);
  }
}

export const storage = new MemStorage();
