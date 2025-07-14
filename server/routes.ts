import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertChildSchema, 
  updateChildAllowanceSchema,
  insertWithdrawalRequestSchema,
  approveWithdrawalSchema,
  insertTransactionSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoints (before auth)
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      version: '2.1.0',
      environment: process.env.NODE_ENV || 'development'
    });
  });
  
  app.get('/health/simple', (req, res) => {
    res.status(200).send('OK');
  });

  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Children routes
  app.get('/api/children', isAuthenticated, async (req: any, res) => {
    try {
      const parentId = req.user.claims.sub;
      const children = await storage.getChildrenByParent(parentId);
      res.json(children);
    } catch (error) {
      console.error("Error fetching children:", error);
      res.status(500).json({ message: "Failed to fetch children" });
    }
  });

  app.get('/api/children/:id', isAuthenticated, async (req: any, res) => {
    try {
      const childId = parseInt(req.params.id);
      const child = await storage.getChild(childId);
      
      if (!child) {
        return res.status(404).json({ message: "Child not found" });
      }

      // Verify parent owns this child
      const parentId = req.user.claims.sub;
      if (child.parentId !== parentId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      res.json(child);
    } catch (error) {
      console.error("Error fetching child:", error);
      res.status(500).json({ message: "Failed to fetch child" });
    }
  });

  app.post('/api/children', isAuthenticated, async (req: any, res) => {
    try {
      const parentId = req.user.claims.sub;
      const childData = insertChildSchema.parse({ ...req.body, parentId });
      const child = await storage.createChild(childData);
      res.json(child);
    } catch (error) {
      console.error("Error creating child:", error);
      res.status(400).json({ message: "Failed to create child account" });
    }
  });

  app.patch('/api/children/:id/allowance', isAuthenticated, async (req: any, res) => {
    try {
      const childId = parseInt(req.params.id);
      const { weeklyAllowance, allowanceDay } = updateChildAllowanceSchema.parse(req.body);
      
      // Verify parent owns this child
      const child = await storage.getChild(childId);
      if (!child || child.parentId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const updatedChild = await storage.updateChildAllowance(childId, weeklyAllowance, allowanceDay);
      res.json(updatedChild);
    } catch (error) {
      console.error("Error updating allowance:", error);
      res.status(400).json({ message: "Failed to update allowance" });
    }
  });

  // Transaction routes
  app.get('/api/children/:id/transactions', isAuthenticated, async (req: any, res) => {
    try {
      const childId = parseInt(req.params.id);
      
      // Verify parent owns this child
      const child = await storage.getChild(childId);
      if (!child || child.parentId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const transactions = await storage.getTransactionsByChild(childId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.get('/api/transactions/recent', isAuthenticated, async (req: any, res) => {
    try {
      const parentId = req.user.claims.sub;
      const transactions = await storage.getRecentTransactionsByParent(parentId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      res.status(500).json({ message: "Failed to fetch recent transactions" });
    }
  });

  // Withdrawal request routes
  app.get('/api/withdrawal-requests', isAuthenticated, async (req: any, res) => {
    try {
      const parentId = req.user.claims.sub;
      const requests = await storage.getWithdrawalRequestsByParent(parentId);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error);
      res.status(500).json({ message: "Failed to fetch withdrawal requests" });
    }
  });

  app.post('/api/withdrawal-requests', isAuthenticated, async (req: any, res) => {
    try {
      const requestData = insertWithdrawalRequestSchema.parse(req.body);
      
      // Verify parent owns this child
      const child = await storage.getChild(requestData.childId);
      if (!child || child.parentId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const request = await storage.createWithdrawalRequest(requestData);
      res.json(request);
    } catch (error) {
      console.error("Error creating withdrawal request:", error);
      res.status(400).json({ message: "Failed to create withdrawal request" });
    }
  });

  app.patch('/api/withdrawal-requests/:id', isAuthenticated, async (req: any, res) => {
    try {
      const requestId = parseInt(req.params.id);
      const { approved } = approveWithdrawalSchema.parse(req.body);
      
      const status = approved ? 'approved' : 'denied';
      const request = await storage.updateWithdrawalRequestStatus(requestId, status);
      res.json(request);
    } catch (error) {
      console.error("Error updating withdrawal request:", error);
      res.status(400).json({ message: "Failed to update withdrawal request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
