import "./Navbar.css";
import {
  IconDashboard,
  IconAccounts,
  IconTransactions,
  IconBudgets,
  IconGoals,
} from "../Icons";

type Page = "dashboard" | "accounts" | "transactions" | "budgets" | "goals";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const PAGES: {
  id: Page;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}[] = [
  { id: "dashboard", Icon: IconDashboard, label: "Dashboard" },
  { id: "accounts", Icon: IconAccounts, label: "Comptes" },
  { id: "transactions", Icon: IconTransactions, label: "Transactions" },
  { id: "budgets", Icon: IconBudgets, label: "Budgets" },
  { id: "goals", Icon: IconGoals, label: "Objectifs" },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button
          type="button"
          className="navbar-brand"
          onClick={() => onNavigate("dashboard")}
        >
          <span className="navbar-logo">
            <img src="/logo.png" alt="Track€r" />
          </span>
          <span className="navbar-title">
            Track<span className="navbar-title-euro">€</span>r
          </span>
        </button>
        <div className="navbar-links">
          {PAGES.map((page) => {
            const Icon = page.Icon;
            return (
              <button
                key={page.id}
                type="button"
                className={`navbar-link ${
                  currentPage === page.id ? "navbar-link--active" : ""
                }`}
                onClick={() => onNavigate(page.id)}
              >
                <span className="navbar-link-icon">
                  <Icon size={20} />
                </span>
                <span className="navbar-link-label">{page.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
