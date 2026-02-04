import { useState, useEffect } from "react";
import { useStore } from "@/store";
import Navbar from "@/components/Navbar/Navbar";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Accounts from "@/pages/Accounts/Accounts";
import Transactions from "@/pages/Transactions/Transactions";
import Budgets from "@/pages/Budgets/Budgets";
import Goals from "@/pages/Goals/Goals";
import "./App.css";

type Page = "dashboard" | "accounts" | "transactions" | "budgets" | "goals";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const { loadFromStorage, loadMockData } = useStore();

  useEffect(() => {
    loadFromStorage();
    // Charger le mock s'il n'y a pas d'utilisateur ou aucun compte (première visite ou ancienne démo vide)
    const storedUser = localStorage.getItem("tracker_user");
    const storedAccounts = localStorage.getItem("tracker_accounts");
    const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
    const hasNoData =
      !storedUser || !Array.isArray(accounts) || accounts.length === 0;
    if (hasNoData) {
      loadMockData();
    }
  }, [loadFromStorage, loadMockData]);

  const renderPage = () => {
    switch (currentPage) {
      case "accounts":
        return <Accounts />;
      case "transactions":
        return <Transactions />;
      case "budgets":
        return <Budgets />;
      case "goals":
        return <Goals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="app-content">{renderPage()}</main>
    </div>
  );
}

export default App;
