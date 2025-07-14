import {
  users,
  children,
  transactions,
  withdrawalRequests,
  type User,
  type UpsertUser,
  type Child,
  type InsertChild,
  type Transaction,
  type InsertTransaction,
  type WithdrawalRequest,
  type InsertWithdrawalRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Child operations
  getChildrenByParent(parentId: string): Promise<Child[]>;
  getChild(id: number): Promise<Child | undefined>;
  createChild(child: InsertChild): Promise<Child>;
  updateChildAllowance(childId: number, weeklyAllowance: string, allowanceDay: number): Promise<Child>;
  updateChildSpendingThreshold(childId: number, threshold: string): Promise<Child>;
  updateChildBalances(childId: number, savingsBalance?: string, spendingBalance?: string): Promise<Child>;
  
  // Transaction operations
  getTransactionsByChild(childId: number, limit?: number): Promise<Transaction[]>;
  getRecentTransactionsByParent(parentId: string, limit?: number): Promise<(Transaction & { childName: string })[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Withdrawal request operations
  getWithdrawalRequestsByParent(parentId: string): Promise<(WithdrawalRequest & { childName: string })[]>;
  getWithdrawalRequestsByChild(childId: number): Promise<WithdrawalRequest[]>;
  createWithdrawalRequest(request: InsertWithdrawalRequest): Promise<WithdrawalRequest>;
  updateWithdrawalRequestStatus(requestId: number, status: string): Promise<WithdrawalRequest>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Child operations
  async getChildrenByParent(parentId: string): Promise<Child[]> {
    return await db
      .select()
      .from(children)
      .where(eq(children.parentId, parentId))
      .orderBy(children.createdAt);
  }

  async getChild(id: number): Promise<Child | undefined> {
    const [child] = await db.select().from(children).where(eq(children.id, id));
    return child;
  }

  async createChild(child: InsertChild): Promise<Child> {
    const [newChild] = await db.insert(children).values(child).returning();
    return newChild;
  }

  async updateChildAllowance(childId: number, weeklyAllowance: string, allowanceDay: number): Promise<Child> {
    const [updatedChild] = await db
      .update(children)
      .set({ weeklyAllowance, allowanceDay, updatedAt: new Date() })
      .where(eq(children.id, childId))
      .returning();
    return updatedChild;
  }

  async updateChildSpendingThreshold(childId: number, threshold: string): Promise<Child> {
    const [child] = await db
      .update(children)
      .set({ spendingThreshold: threshold, updatedAt: new Date() })
      .where(eq(children.id, childId))
      .returning();
    return child;
  }

  async updateChildBalances(childId: number, savingsBalance?: string, spendingBalance?: string): Promise<Child> {
    const updateData: any = { updatedAt: new Date() };
    if (savingsBalance !== undefined) updateData.savingsBalance = savingsBalance;
    if (spendingBalance !== undefined) updateData.spendingBalance = spendingBalance;

    const [updatedChild] = await db
      .update(children)
      .set(updateData)
      .where(eq(children.id, childId))
      .returning();
    return updatedChild;
  }

  // Transaction operations
  async getTransactionsByChild(childId: number, limit = 10): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.childId, childId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit);
  }

  async getRecentTransactionsByParent(parentId: string, limit = 10): Promise<(Transaction & { childName: string })[]> {
    const result = await db
      .select({
        id: transactions.id,
        childId: transactions.childId,
        type: transactions.type,
        amount: transactions.amount,
        description: transactions.description,
        status: transactions.status,
        createdAt: transactions.createdAt,
        childName: children.name,
      })
      .from(transactions)
      .innerJoin(children, eq(transactions.childId, children.id))
      .where(eq(children.parentId, parentId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit);
    
    return result;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db.insert(transactions).values(transaction).returning();
    return newTransaction;
  }

  // Withdrawal request operations
  async getWithdrawalRequestsByParent(parentId: string): Promise<(WithdrawalRequest & { childName: string })[]> {
    const result = await db
      .select({
        id: withdrawalRequests.id,
        childId: withdrawalRequests.childId,
        amount: withdrawalRequests.amount,
        reason: withdrawalRequests.reason,
        status: withdrawalRequests.status,
        createdAt: withdrawalRequests.createdAt,
        updatedAt: withdrawalRequests.updatedAt,
        childName: children.name,
      })
      .from(withdrawalRequests)
      .innerJoin(children, eq(withdrawalRequests.childId, children.id))
      .where(and(eq(children.parentId, parentId), eq(withdrawalRequests.status, "pending")))
      .orderBy(desc(withdrawalRequests.createdAt));
    
    return result;
  }

  async getWithdrawalRequestsByChild(childId: number): Promise<WithdrawalRequest[]> {
    return await db
      .select()
      .from(withdrawalRequests)
      .where(eq(withdrawalRequests.childId, childId))
      .orderBy(desc(withdrawalRequests.createdAt));
  }

  async createWithdrawalRequest(request: InsertWithdrawalRequest): Promise<WithdrawalRequest> {
    const [newRequest] = await db.insert(withdrawalRequests).values(request).returning();
    return newRequest;
  }

  async updateWithdrawalRequestStatus(requestId: number, status: string): Promise<WithdrawalRequest> {
    const [updatedRequest] = await db
      .update(withdrawalRequests)
      .set({ status, updatedAt: new Date() })
      .where(eq(withdrawalRequests.id, requestId))
      .returning();
    return updatedRequest;
  }
}

export const storage = new DatabaseStorage();
