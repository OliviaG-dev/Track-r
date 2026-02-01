import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, Account, Transaction, Category, Budget, Goal } from '@/types';
import { StorageService, STORAGE_KEYS } from '@/services/storage.service';
import { generateId } from '@/utils/helpers';

interface AppState {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  goals: Goal[];
}

interface StoreContextValue extends AppState {
  setUser: (user: User) => void;
  addAccount: (account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  updateAccountBalance: (accountId: string, amount: number, type: 'increase' | 'decrease') => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  loadFromStorage: () => void;
  clearAllData: () => void;
  initializeDefaultData: () => void;
}

const initialState: AppState = {
  user: null,
  accounts: [],
  transactions: [],
  categories: [],
  budgets: [],
  goals: [],
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const setUser = useCallback((user: User) => {
    setState(prev => ({ ...prev, user }));
    StorageService.set(STORAGE_KEYS.USER, user);
  }, []);

  const updateAccountBalance = useCallback((accountId: string, amount: number, type: 'increase' | 'decrease') => {
    setState(prev => {
      const accounts = prev.accounts.map(acc =>
        acc.id === accountId
          ? {
              ...acc,
              currentBalance: type === 'increase' ? acc.currentBalance + amount : acc.currentBalance - amount,
              updatedAt: new Date(),
            }
          : acc
      );
      StorageService.set(STORAGE_KEYS.ACCOUNTS, accounts);
      return { ...prev, accounts };
    });
  }, []);

  const addAccount = useCallback((accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => {
    const account: Account = {
      ...accountData,
      id: generateId(),
      currentBalance: accountData.initialBalance,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setState(prev => {
      const accounts = [...prev.accounts, account];
      StorageService.set(STORAGE_KEYS.ACCOUNTS, accounts);
      return { ...prev, accounts };
    });
  }, []);

  const updateAccount = useCallback((id: string, updates: Partial<Account>) => {
    setState(prev => {
      const accounts = prev.accounts.map(acc =>
        acc.id === id ? { ...acc, ...updates, updatedAt: new Date() } : acc
      );
      StorageService.set(STORAGE_KEYS.ACCOUNTS, accounts);
      return { ...prev, accounts };
    });
  }, []);

  const deleteAccount = useCallback((id: string) => {
    setState(prev => {
      const accounts = prev.accounts.filter(acc => acc.id !== id);
      StorageService.set(STORAGE_KEYS.ACCOUNTS, accounts);
      return { ...prev, accounts };
    });
  }, []);

  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const transaction: Transaction = {
      ...transactionData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setState(prev => {
      const accounts = prev.accounts.map(acc => {
        if (acc.id === transaction.accountId) {
          const delta = transaction.type === 'income' ? 'increase' : 'decrease';
          return { ...acc, currentBalance: delta === 'increase' ? acc.currentBalance + transaction.amount : acc.currentBalance - transaction.amount, updatedAt: new Date() };
        }
        return acc;
      });
      const transactions = [...prev.transactions, transaction];
      StorageService.set(STORAGE_KEYS.ACCOUNTS, accounts);
      StorageService.set(STORAGE_KEYS.TRANSACTIONS, transactions);
      return { ...prev, transactions, accounts };
    });
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setState(prev => {
      const oldTransaction = prev.transactions.find(t => t.id === id);
      if (!oldTransaction) return prev;
      const newTransaction = { ...oldTransaction, ...updates, updatedAt: new Date() };
      let accounts = prev.accounts.map(acc => {
        if (acc.id === oldTransaction.accountId) {
          const delta = oldTransaction.type === 'income' ? 'decrease' : 'increase';
          return { ...acc, currentBalance: delta === 'decrease' ? acc.currentBalance - oldTransaction.amount : acc.currentBalance + oldTransaction.amount, updatedAt: new Date() };
        }
        return acc;
      });
      accounts = accounts.map(acc => {
        if (acc.id === newTransaction.accountId) {
          const delta = newTransaction.type === 'income' ? 'increase' : 'decrease';
          return { ...acc, currentBalance: delta === 'increase' ? acc.currentBalance + newTransaction.amount : acc.currentBalance - newTransaction.amount, updatedAt: new Date() };
        }
        return acc;
      });
      const transactions = prev.transactions.map(t => (t.id === id ? newTransaction : t));
      StorageService.set(STORAGE_KEYS.TRANSACTIONS, transactions);
      StorageService.set(STORAGE_KEYS.ACCOUNTS, accounts);
      return { ...prev, transactions, accounts };
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setState(prev => {
      const transaction = prev.transactions.find(t => t.id === id);
      let accounts = prev.accounts;
      if (transaction) {
        accounts = prev.accounts.map(acc => {
          if (acc.id === transaction.accountId) {
            const delta = transaction.type === 'income' ? 'decrease' : 'increase';
            return { ...acc, currentBalance: delta === 'decrease' ? acc.currentBalance - transaction.amount : acc.currentBalance + transaction.amount, updatedAt: new Date() };
          }
          return acc;
        });
        StorageService.set(STORAGE_KEYS.ACCOUNTS, accounts);
      }
      const transactions = prev.transactions.filter(t => t.id !== id);
      StorageService.set(STORAGE_KEYS.TRANSACTIONS, transactions);
      return { ...prev, transactions, accounts };
    });
  }, []);

  const addCategory = useCallback((categoryData: Omit<Category, 'id'>) => {
    const category: Category = { ...categoryData, id: generateId() };
    setState(prev => {
      const categories = [...prev.categories, category];
      StorageService.set(STORAGE_KEYS.CATEGORIES, categories);
      return { ...prev, categories };
    });
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setState(prev => {
      const categories = prev.categories.map(cat => (cat.id === id ? { ...cat, ...updates } : cat));
      StorageService.set(STORAGE_KEYS.CATEGORIES, categories);
      return { ...prev, categories };
    });
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setState(prev => {
      const categories = prev.categories.filter(cat => cat.id !== id);
      StorageService.set(STORAGE_KEYS.CATEGORIES, categories);
      return { ...prev, categories };
    });
  }, []);

  const addBudget = useCallback((budgetData: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => {
    const budget: Budget = {
      ...budgetData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setState(prev => {
      const budgets = [...prev.budgets, budget];
      StorageService.set(STORAGE_KEYS.BUDGETS, budgets);
      return { ...prev, budgets };
    });
  }, []);

  const updateBudget = useCallback((id: string, updates: Partial<Budget>) => {
    setState(prev => {
      const budgets = prev.budgets.map(b =>
        b.id === id ? { ...b, ...updates, updatedAt: new Date() } : b
      );
      StorageService.set(STORAGE_KEYS.BUDGETS, budgets);
      return { ...prev, budgets };
    });
  }, []);

  const deleteBudget = useCallback((id: string) => {
    setState(prev => {
      const budgets = prev.budgets.filter(b => b.id !== id);
      StorageService.set(STORAGE_KEYS.BUDGETS, budgets);
      return { ...prev, budgets };
    });
  }, []);

  const addGoal = useCallback((goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const goal: Goal = {
      ...goalData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setState(prev => {
      const goals = [...prev.goals, goal];
      StorageService.set(STORAGE_KEYS.GOALS, goals);
      return { ...prev, goals };
    });
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    setState(prev => {
      const goals = prev.goals.map(g => (g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g));
      StorageService.set(STORAGE_KEYS.GOALS, goals);
      return { ...prev, goals };
    });
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setState(prev => {
      const goals = prev.goals.filter(g => g.id !== id);
      StorageService.set(STORAGE_KEYS.GOALS, goals);
      return { ...prev, goals };
    });
  }, []);

  const loadFromStorage = useCallback(() => {
    const user = StorageService.get<User>(STORAGE_KEYS.USER);
    const accounts = StorageService.get<Account[]>(STORAGE_KEYS.ACCOUNTS) || [];
    const transactions = StorageService.get<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];
    const categories = StorageService.get<Category[]>(STORAGE_KEYS.CATEGORIES) || [];
    const budgets = StorageService.get<Budget[]>(STORAGE_KEYS.BUDGETS) || [];
    const goals = StorageService.get<Goal[]>(STORAGE_KEYS.GOALS) || [];
    setState({ user, accounts, transactions, categories, budgets, goals });
  }, []);

  const clearAllData = useCallback(() => {
    StorageService.clear();
    setState(initialState);
  }, []);

  const initializeDefaultData = useCallback(() => {
    const userId = generateId();
    const user: User = {
      id: userId,
      email: 'demo@tracker.com',
      name: 'Utilisateur Demo',
      createdAt: new Date(),
    };
    const defaultCategories: Category[] = [
      { id: generateId(), name: 'Nourriture', type: 'expense', icon: '🍔', color: '#FF6B6B', userId },
      { id: generateId(), name: 'Transport', type: 'expense', icon: '🚗', color: '#4ECDC4', userId },
      { id: generateId(), name: 'Logement', type: 'expense', icon: '🏠', color: '#45B7D1', userId },
      { id: generateId(), name: 'Loisirs', type: 'expense', icon: '🎮', color: '#FFA07A', userId },
      { id: generateId(), name: 'Santé', type: 'expense', icon: '⚕️', color: '#98D8C8', userId },
      { id: generateId(), name: 'Shopping', type: 'expense', icon: '🛍️', color: '#F7DC6F', userId },
      { id: generateId(), name: 'Factures', type: 'expense', icon: '📄', color: '#BB8FCE', userId },
      { id: generateId(), name: 'Autres', type: 'expense', icon: '📦', color: '#95A5A6', userId },
      { id: generateId(), name: 'Salaire', type: 'income', icon: '💼', color: '#52C41A', userId },
      { id: generateId(), name: 'Freelance', type: 'income', icon: '💻', color: '#1890FF', userId },
      { id: generateId(), name: 'Aides', type: 'income', icon: '🎁', color: '#722ED1', userId },
      { id: generateId(), name: 'Autres revenus', type: 'income', icon: '💰', color: '#13C2C2', userId },
    ];
    setState(prev => ({ ...prev, user, categories: defaultCategories }));
    StorageService.set(STORAGE_KEYS.USER, user);
    StorageService.set(STORAGE_KEYS.CATEGORIES, defaultCategories);
  }, []);

  const value: StoreContextValue = {
    ...state,
    setUser,
    addAccount,
    updateAccount,
    deleteAccount,
    updateAccountBalance,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
    addBudget,
    updateBudget,
    deleteBudget,
    addGoal,
    updateGoal,
    deleteGoal,
    loadFromStorage,
    clearAllData,
    initializeDefaultData,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
