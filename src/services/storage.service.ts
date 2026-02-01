// Service de gestion du localStorage pour Track€r

const STORAGE_KEYS = {
  USER: 'tracker_user',
  ACCOUNTS: 'tracker_accounts',
  TRANSACTIONS: 'tracker_transactions',
  CATEGORIES: 'tracker_categories',
  BUDGETS: 'tracker_budgets',
  GOALS: 'tracker_goals',
} as const;

export class StorageService {
  // Méthodes génériques
  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Export / Import
  static exportData(): string {
    const data = {
      user: this.get(STORAGE_KEYS.USER),
      accounts: this.get(STORAGE_KEYS.ACCOUNTS),
      transactions: this.get(STORAGE_KEYS.TRANSACTIONS),
      categories: this.get(STORAGE_KEYS.CATEGORIES),
      budgets: this.get(STORAGE_KEYS.BUDGETS),
      goals: this.get(STORAGE_KEYS.GOALS),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  static importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.user) this.set(STORAGE_KEYS.USER, data.user);
      if (data.accounts) this.set(STORAGE_KEYS.ACCOUNTS, data.accounts);
      if (data.transactions) this.set(STORAGE_KEYS.TRANSACTIONS, data.transactions);
      if (data.categories) this.set(STORAGE_KEYS.CATEGORIES, data.categories);
      if (data.budgets) this.set(STORAGE_KEYS.BUDGETS, data.budgets);
      if (data.goals) this.set(STORAGE_KEYS.GOALS, data.goals);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

export { STORAGE_KEYS };
