import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertCaseSchema } from "@shared/schema";
import { z } from "zod";

function requireAuth(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (!req.isAuthenticated()) {
    // API requests should return JSON
    if (req.headers.accept?.includes('application/json')) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Browser requests should return error message
    return res.status(401).send("You must be logged in to access this page");
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Public routes
  app.get("/api/cases/search", async (req, res) => {
    const caseNumber = req.query.caseNumber as string;
    if (!caseNumber) {
      return res.status(400).json({ message: "Case number is required" });
    }
    const foundCase = await storage.getCaseByNumber(caseNumber);
    if (!foundCase) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.json(foundCase);
  });

  // Protected routes
  app.get("/api/cases", requireAuth, async (_req, res) => {
    try {
      const cases = await storage.getCases();
      res.json(cases);
    } catch (error) {
      console.error('Error fetching cases:', error);
      res.status(500).json({ message: "Failed to fetch cases" });
    }
  });

  app.post("/api/cases", requireAuth, async (req, res) => {
    try {
      const caseData = insertCaseSchema.parse(req.body);
      const existingCase = await storage.getCaseByNumber(caseData.caseNumber);
      if (existingCase) {
        return res.status(400).json({ message: "Case number already exists" });
      }
      const newCase = await storage.createCase(caseData);
      res.status(201).json(newCase);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid case data", errors: error.errors });
      }
      throw error;
    }
  });

  app.patch("/api/cases/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const caseData = insertCaseSchema.partial().parse(req.body);
      const updatedCase = await storage.updateCase(id, caseData);
      res.json(updatedCase);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid case data", errors: error.errors });
      }
      throw error;
    }
  });

  app.delete("/api/cases/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteCase(id);
    res.sendStatus(204);
  });

  const httpServer = createServer(app);
  return httpServer;
}