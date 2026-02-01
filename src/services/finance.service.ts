import { Transaction, Category, Budget, Account, DashboardStats, BudgetStatus, Insight } from '@/types';

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}
function isWithinInterval(date: Date, { start, end }: { start: Date; end: Date }): boolean {
  const t = date.getTime();
  return t >= start.getTime() && t <= end.getTime();
}
function subMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() - n, d.getDate());
}
function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

export class FinanceService {
  // Calcul du solde total de tous les comptes
  static calculateTotalBalance(accounts: Account[]): number {
    return accounts.reduce((sum, account) => sum + account.currentBalance, 0);
  }

  // Calcul des revenus pour une période
  static calculateIncome(transactions: Transaction[], startDate: Date, endDate: Date): number {
    return transactions
      .filter(t => 
        t.type === 'income' && 
        isWithinInterval(new Date(t.date), { start: startDate, end: endDate })
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Calcul des dépenses pour une période
  static calculateExpenses(transactions: Transaction[], startDate: Date, endDate: Date): number {
    return transactions
      .filter(t => 
        t.type === 'expense' && 
        isWithinInterval(new Date(t.date), { start: startDate, end: endDate })
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Dépenses par catégorie
  static getExpensesByCategory(
    transactions: Transaction[], 
    categories: Category[], 
    startDate: Date, 
    endDate: Date
  ) {
    const expenseTransactions = transactions.filter(t => 
      t.type === 'expense' && 
      isWithinInterval(new Date(t.date), { start: startDate, end: endDate })
    );

    const total = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    const grouped = expenseTransactions.reduce((acc, t) => {
      if (!acc[t.categoryId]) {
        acc[t.categoryId] = 0;
      }
      acc[t.categoryId] += t.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        categoryId,
        categoryName: category?.name || 'Inconnu',
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      };
    }).sort((a, b) => b.amount - a.amount);
  }

  // Évolution du solde sur les derniers mois
  static getBalanceEvolution(transactions: Transaction[], accounts: Account[], months: number = 6) {
    const evolution: { date: string; balance: number }[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const targetDate = subMonths(now, i);
      const monthStart = startOfMonth(targetDate);
      const monthEnd = endOfMonth(targetDate);

      // Calculer le solde à la fin du mois
      const transactionsUpToDate = transactions.filter(t => 
        new Date(t.date) <= monthEnd
      );

      const totalIncome = transactionsUpToDate
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = transactionsUpToDate
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const initialBalance = accounts.reduce((sum, acc) => sum + acc.initialBalance, 0);
      const balance = initialBalance + totalIncome - totalExpenses;

      evolution.push({
        date: formatMonthYear(monthEnd),
        balance,
      });
    }

    return evolution;
  }

  // Statut des budgets
  static getBudgetStatus(
    budget: Budget, 
    transactions: Transaction[], 
    category: Category
  ): BudgetStatus {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const spent = transactions
      .filter(t => 
        t.categoryId === budget.categoryId &&
        t.type === 'expense' &&
        isWithinInterval(new Date(t.date), { start: monthStart, end: monthEnd })
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;

    return {
      budget,
      spent,
      remaining: budget.amount - spent,
      percentage,
      isOver: spent > budget.amount,
      category,
    };
  }

  // Génération d'insights automatiques
  static generateInsights(
    transactions: Transaction[],
    accounts: Account[],
    budgets: Budget[],
    categories: Category[]
  ): Insight[] {
    const insights: Insight[] = [];
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Revenus vs Dépenses
    const monthlyIncome = this.calculateIncome(transactions, monthStart, monthEnd);
    const monthlyExpenses = this.calculateExpenses(transactions, monthStart, monthEnd);
    
    if (monthlyIncome > 0) {
      const expenseRatio = (monthlyExpenses / monthlyIncome) * 100;
      
      if (expenseRatio > 90) {
        insights.push({
          id: 'high-expenses',
          type: 'warning',
          title: 'Dépenses élevées',
          description: `Tes dépenses représentent ${expenseRatio.toFixed(0)}% de tes revenus ce mois-ci.`,
          icon: '⚠️',
        });
      } else if (expenseRatio < 70) {
        insights.push({
          id: 'good-savings',
          type: 'success',
          title: 'Belle épargne !',
          description: `Tu économises ${(100 - expenseRatio).toFixed(0)}% de tes revenus ce mois-ci 👍`,
          icon: '💰',
        });
      }
    }

    // Budgets dépassés
    budgets.forEach(budget => {
      const category = categories.find(c => c.id === budget.categoryId);
      if (!category) return;

      const status = this.getBudgetStatus(budget, transactions, category);
      
      if (status.isOver) {
        insights.push({
          id: `budget-over-${budget.id}`,
          type: 'danger',
          title: `Budget ${category.name} dépassé`,
          description: `Tu as dépensé ${status.spent.toFixed(2)}€ sur ${budget.amount}€ prévus.`,
          icon: '🚨',
        });
      }
    });

    // Tendance positive
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));
    const lastMonthExpenses = this.calculateExpenses(transactions, lastMonthStart, lastMonthEnd);
    
    if (monthlyExpenses < lastMonthExpenses && lastMonthExpenses > 0) {
      const reduction = ((lastMonthExpenses - monthlyExpenses) / lastMonthExpenses) * 100;
      insights.push({
        id: 'expenses-down',
        type: 'success',
        title: 'Dépenses en baisse',
        description: `Tes dépenses ont baissé de ${reduction.toFixed(0)}% par rapport au mois dernier 📉`,
        icon: '✅',
      });
    }

    return insights;
  }

  // Statistiques du dashboard
  static getDashboardStats(
    transactions: Transaction[],
    accounts: Account[],
    categories: Category[]
  ): DashboardStats {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const totalBalance = this.calculateTotalBalance(accounts);
    const monthlyIncome = this.calculateIncome(transactions, monthStart, monthEnd);
    const monthlyExpenses = this.calculateExpenses(transactions, monthStart, monthEnd);
    const netSavings = monthlyIncome - monthlyExpenses;
    const expensesByCategory = this.getExpensesByCategory(transactions, categories, monthStart, monthEnd);
    const balanceEvolution = this.getBalanceEvolution(transactions, accounts);

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      netSavings,
      expensesByCategory,
      balanceEvolution,
    };
  }
}
