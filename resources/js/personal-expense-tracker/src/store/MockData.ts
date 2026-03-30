export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  type: 'cash' | 'bank' | 'credit';
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  walletId: string;
  date: string; // ISO string
  note?: string;
  labels?: string[];
}

export interface Budget {
  id: string;
  categoryId: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#f59e0b' },
  { id: '2', name: 'Transportation', color: '#3b82f6' },
  { id: '3', name: 'Shopping', color: '#ec4899' },
  { id: '4', name: 'Entertainment', color: '#8b5cf6' },
  { id: '5', name: 'Bills & Utilities', color: '#ef4444' },
  { id: '6', name: 'Salary', color: '#10b981' },
];

export const MOCK_WALLETS: Wallet[] = [
  { id: 'w1', name: 'Main Bank Account', balance: 5240.50, type: 'bank' },
  { id: 'w2', name: 'Cash Wallet', balance: 350.00, type: 'cash' },
  { id: 'w3', name: 'Credit Card', balance: -1200.00, type: 'credit' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', amount: 3000, type: 'income', categoryId: '6', walletId: 'w1', date: new Date().toISOString(), note: 'Monthly Salary' },
  { id: 't2', amount: 45.50, type: 'expense', categoryId: '1', walletId: 'w2', date: new Date().toISOString(), note: 'Lunch with friends' },
  { id: 't3', amount: 120, type: 'expense', categoryId: '5', walletId: 'w1', date: new Date(Date.now() - 86400000).toISOString(), note: 'Electricity Bill' },
  { id: 't4', amount: 60, type: 'expense', categoryId: '2', walletId: 'w3', date: new Date(Date.now() - 172800000).toISOString(), note: 'Gas' },
  { id: 't5', amount: 150, type: 'expense', categoryId: '3', walletId: 'w3', date: new Date(Date.now() - 259200000).toISOString(), note: 'Groceries' },
];

export const MOCK_BUDGETS: Budget[] = [
  { id: 'b1', categoryId: '1', limit: 500, spent: 345.50, period: 'monthly' },
  { id: 'b2', categoryId: '3', limit: 300, spent: 150, period: 'monthly' },
  { id: 'b3', categoryId: '4', limit: 200, spent: 80, period: 'monthly' },
];
