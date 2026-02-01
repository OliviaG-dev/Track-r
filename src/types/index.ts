// Types de base pour l'application Track€r

export type AccountType = 'checking' | 'savings' | 'cash' | 'card';

export type TransactionType = 'income' | 'expense';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  currentBalance: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
  userId: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  amount: number;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: Date;
  endDate?: Date;
  alertAt75: boolean;
  alertAt100: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  userId: string;
  accountId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netSavings: number;
  expensesByCategory: { categoryId: string; categoryName: string; amount: number; percentage: number }[];
  balanceEvolution: { date: string; balance: number }[];
}

export interface BudgetStatus {
  budget: Budget;
  spent: number;
  remaining: number;
  percentage: number;
  isOver: boolean;
  category: Category;
}

export interface Insight {
  id: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  title: string;
  description: string;
  icon: string;
}
