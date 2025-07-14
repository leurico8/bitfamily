import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Child accounts managed by parents
export const children = pgTable("children", {
  id: serial("id").primaryKey(),
  parentId: varchar("parent_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  age: integer("age").notNull(),
  profileImageUrl: varchar("profile_image_url"),
  // PRIVACY: No real Bitcoin addresses stored - use labels only
  addressLabel: varchar("address_label"), // Internal label like "Emma's Savings"
  savingsBalance: decimal("savings_balance", { precision: 16, scale: 8 }).default("0"),
  spendingBalance: decimal("spending_balance", { precision: 16, scale: 8 }).default("0"),
  weeklyAllowance: decimal("weekly_allowance", { precision: 16, scale: 8 }).default("0"),
  allowanceDay: integer("allowance_day").default(0), // 0 = Sunday, 1 = Monday, etc.
  spendingThreshold: decimal("spending_threshold", { precision: 16, scale: 8 }).default("0.001"), // Auto-convert to savings above this amount
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transaction history
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  childId: integer("child_id").notNull().references(() => children.id),
  type: varchar("type").notNull(), // 'allowance', 'spending', 'savings_deposit', 'savings_withdrawal'
  amount: decimal("amount", { precision: 16, scale: 8 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status").default("completed"), // 'pending', 'completed', 'denied'
  createdAt: timestamp("created_at").defaultNow(),
});

// Withdrawal requests that need parent approval
export const withdrawalRequests = pgTable("withdrawal_requests", {
  id: serial("id").primaryKey(),
  childId: integer("child_id").notNull().references(() => children.id),
  amount: decimal("amount", { precision: 16, scale: 8 }).notNull(),
  reason: text("reason").notNull(),
  status: varchar("status").default("pending"), // 'pending', 'approved', 'denied'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  children: many(children),
}));

export const childrenRelations = relations(children, ({ one, many }) => ({
  parent: one(users, {
    fields: [children.parentId],
    references: [users.id],
  }),
  transactions: many(transactions),
  withdrawalRequests: many(withdrawalRequests),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  child: one(children, {
    fields: [transactions.childId],
    references: [children.id],
  }),
}));

export const withdrawalRequestsRelations = relations(withdrawalRequests, ({ one }) => ({
  child: one(children, {
    fields: [withdrawalRequests.childId],
    references: [children.id],
  }),
}));

// Schemas for validation
export const insertChildSchema = createInsertSchema(children).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertWithdrawalRequestSchema = createInsertSchema(withdrawalRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateChildAllowanceSchema = z.object({
  weeklyAllowance: z.string(),
  allowanceDay: z.number().min(0).max(6),
});

export const approveWithdrawalSchema = z.object({
  requestId: z.number(),
  approved: z.boolean(),
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Child = typeof children.$inferSelect;
export type InsertChild = z.infer<typeof insertChildSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type WithdrawalRequest = typeof withdrawalRequests.$inferSelect;
export type InsertWithdrawalRequest = z.infer<typeof insertWithdrawalRequestSchema>;
