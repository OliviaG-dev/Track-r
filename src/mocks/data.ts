/**
 * Données fictives pour la démo Track€r.
 * IDs fixes pour que comptes, transactions, budgets et objectifs soient cohérents.
 */

import type {
  User,
  Account,
  Category,
  Transaction,
  Budget,
  Goal,
} from "@/types";

const USER_ID = "mock-user-1";
const NOW = new Date();

function d(year: number, month: number, day: number): string {
  return new Date(year, month - 1, day).toISOString().split("T")[0];
}

// ——— Utilisateur ———
export const mockUser: User = {
  id: USER_ID,
  email: "marie@demo.fr",
  name: "Marie Dupont",
  createdAt: new Date(d(NOW.getFullYear(), 1, 1)),
};

// ——— Catégories (dépenses + revenus) ———
const catIds = {
  nourriture: "cat-nourriture",
  transport: "cat-transport",
  logement: "cat-logement",
  loisirs: "cat-loisirs",
  shopping: "cat-shopping",
  factures: "cat-factures",
  autres: "cat-autres",
  salaire: "cat-salaire",
  freelance: "cat-freelance",
  aides: "cat-aides",
} as const;

export const mockCategories: Category[] = [
  {
    id: catIds.nourriture,
    name: "Nourriture",
    type: "expense",
    icon: "🍔",
    color: "#FF6B6B",
    userId: USER_ID,
  },
  {
    id: catIds.transport,
    name: "Transport",
    type: "expense",
    icon: "🚗",
    color: "#4ECDC4",
    userId: USER_ID,
  },
  {
    id: catIds.logement,
    name: "Logement",
    type: "expense",
    icon: "🏠",
    color: "#45B7D1",
    userId: USER_ID,
  },
  {
    id: catIds.loisirs,
    name: "Loisirs",
    type: "expense",
    icon: "🎮",
    color: "#FFA07A",
    userId: USER_ID,
  },
  {
    id: catIds.shopping,
    name: "Shopping",
    type: "expense",
    icon: "🛍️",
    color: "#F7DC6F",
    userId: USER_ID,
  },
  {
    id: catIds.factures,
    name: "Factures",
    type: "expense",
    icon: "📄",
    color: "#BB8FCE",
    userId: USER_ID,
  },
  {
    id: catIds.autres,
    name: "Autres",
    type: "expense",
    icon: "📦",
    color: "#95A5A6",
    userId: USER_ID,
  },
  {
    id: catIds.salaire,
    name: "Salaire",
    type: "income",
    icon: "💼",
    color: "#52C41A",
    userId: USER_ID,
  },
  {
    id: catIds.freelance,
    name: "Freelance",
    type: "income",
    icon: "💻",
    color: "#1890FF",
    userId: USER_ID,
  },
  {
    id: catIds.aides,
    name: "Aides",
    type: "income",
    icon: "🎁",
    color: "#722ED1",
    userId: USER_ID,
  },
  {
    id: "cat-autres-revenus",
    name: "Autres revenus",
    type: "income",
    icon: "💰",
    color: "#13C2C2",
    userId: USER_ID,
  },
];

// ——— Comptes ———
const accIds = { courant: "acc-courant", epargne: "acc-epargne" } as const;

export const mockAccounts: Account[] = [
  {
    id: accIds.courant,
    userId: USER_ID,
    name: "Compte courant",
    type: "checking",
    initialBalance: 1500,
    currentBalance: 3307.5, // 1500 + revenus - dépenses (tx 1-8)
    color: "#00BFFF",
    createdAt: new Date(d(NOW.getFullYear(), 1, 1)),
    updatedAt: new Date(),
  },
  {
    id: accIds.epargne,
    userId: USER_ID,
    name: "Livret A",
    type: "savings",
    initialBalance: 5000,
    currentBalance: 5200,
    color: "#32CD32",
    createdAt: new Date(d(NOW.getFullYear(), 1, 5)),
    updatedAt: new Date(),
  },
];

// ——— Transactions (ce mois + mois dernier) ———
const y = NOW.getFullYear();
const m = NOW.getMonth(); // 0-indexed
const thisMonthStr = (day: number) => d(y, m + 1, day);
const lastMonthStr = (day: number) => d(y, m, day);

export const mockTransactions: Transaction[] = [
  // Revenus ce mois
  {
    id: "tx-1",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.salaire,
    type: "income",
    amount: 2450,
    description: "Salaire février",
    date: new Date(thisMonthStr(1)),
    createdAt: new Date(thisMonthStr(1)),
    updatedAt: new Date(thisMonthStr(1)),
  },
  {
    id: "tx-2",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.freelance,
    type: "income",
    amount: 320,
    description: "Mission graphisme",
    date: new Date(thisMonthStr(12)),
    createdAt: new Date(thisMonthStr(12)),
    updatedAt: new Date(thisMonthStr(12)),
  },
  // Dépenses ce mois
  {
    id: "tx-3",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.nourriture,
    type: "expense",
    amount: 87.5,
    description: "Courses Carrefour",
    date: new Date(thisMonthStr(3)),
    createdAt: new Date(thisMonthStr(3)),
    updatedAt: new Date(thisMonthStr(3)),
  },
  {
    id: "tx-4",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.transport,
    type: "expense",
    amount: 52,
    description: "Pass Navigo",
    date: new Date(thisMonthStr(1)),
    createdAt: new Date(thisMonthStr(1)),
    updatedAt: new Date(thisMonthStr(1)),
  },
  {
    id: "tx-5",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.logement,
    type: "expense",
    amount: 720,
    description: "Loyer",
    date: new Date(thisMonthStr(5)),
    createdAt: new Date(thisMonthStr(5)),
    updatedAt: new Date(thisMonthStr(5)),
  },
  {
    id: "tx-6",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.loisirs,
    type: "expense",
    amount: 24.5,
    description: "Netflix",
    date: new Date(thisMonthStr(10)),
    createdAt: new Date(thisMonthStr(10)),
    updatedAt: new Date(thisMonthStr(10)),
  },
  {
    id: "tx-7",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.factures,
    type: "expense",
    amount: 45,
    description: "Électricité",
    date: new Date(thisMonthStr(15)),
    createdAt: new Date(thisMonthStr(15)),
    updatedAt: new Date(thisMonthStr(15)),
  },
  {
    id: "tx-8",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.nourriture,
    type: "expense",
    amount: 34,
    description: "Restaurant",
    date: new Date(thisMonthStr(18)),
    createdAt: new Date(thisMonthStr(18)),
    updatedAt: new Date(thisMonthStr(18)),
  },
  // Mois dernier (pour évolution)
  {
    id: "tx-9",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.salaire,
    type: "income",
    amount: 2450,
    description: "Salaire janvier",
    date: new Date(lastMonthStr(1)),
    createdAt: new Date(lastMonthStr(1)),
    updatedAt: new Date(lastMonthStr(1)),
  },
  {
    id: "tx-10",
    userId: USER_ID,
    accountId: accIds.courant,
    categoryId: catIds.logement,
    type: "expense",
    amount: 720,
    description: "Loyer",
    date: new Date(lastMonthStr(5)),
    createdAt: new Date(lastMonthStr(5)),
    updatedAt: new Date(lastMonthStr(5)),
  },
  {
    id: "tx-11",
    userId: USER_ID,
    accountId: accIds.epargne,
    categoryId: catIds.aides,
    type: "income",
    amount: 200,
    description: "Intérêts livret",
    date: new Date(thisMonthStr(1)),
    createdAt: new Date(thisMonthStr(1)),
    updatedAt: new Date(thisMonthStr(1)),
  },
];

// ——— Budgets ———
export const mockBudgets: Budget[] = [
  {
    id: "budget-1",
    userId: USER_ID,
    categoryId: catIds.nourriture,
    amount: 400,
    period: "monthly",
    startDate: new Date(thisMonthStr(1)),
    alertAt75: true,
    alertAt100: true,
    createdAt: new Date(thisMonthStr(1)),
    updatedAt: new Date(thisMonthStr(1)),
  },
  {
    id: "budget-2",
    userId: USER_ID,
    categoryId: catIds.transport,
    amount: 120,
    period: "monthly",
    startDate: new Date(thisMonthStr(1)),
    alertAt75: true,
    alertAt100: true,
    createdAt: new Date(thisMonthStr(1)),
    updatedAt: new Date(thisMonthStr(1)),
  },
  {
    id: "budget-3",
    userId: USER_ID,
    categoryId: catIds.loisirs,
    amount: 80,
    period: "monthly",
    startDate: new Date(thisMonthStr(1)),
    alertAt75: true,
    alertAt100: true,
    createdAt: new Date(thisMonthStr(1)),
    updatedAt: new Date(thisMonthStr(1)),
  },
];

// ——— Objectifs ———
export const mockGoals: Goal[] = [
  {
    id: "goal-1",
    userId: USER_ID,
    accountId: accIds.epargne,
    name: "Vacances été",
    targetAmount: 1500,
    currentAmount: 620,
    targetDate: new Date(y, 6, 1), // 1er juillet
    description: "Week-end à la mer",
    createdAt: new Date(thisMonthStr(1)),
    updatedAt: new Date(),
  },
  {
    id: "goal-2",
    userId: USER_ID,
    accountId: accIds.epargne,
    name: "Fonds d'urgence",
    targetAmount: 3000,
    currentAmount: 1850,
    targetDate: new Date(y, 11, 31), // fin décembre
    description: "3 mois de dépenses",
    createdAt: new Date(lastMonthStr(15)),
    updatedAt: new Date(),
  },
];
