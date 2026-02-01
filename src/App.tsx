import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import Navbar from '@/components/Navbar/Navbar';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Accounts from '@/pages/Accounts/Accounts';
import Transactions from '@/pages/Transactions/Transactions';
import Budgets from '@/pages/Budgets/Budgets';
import Goals from '@/pages/Goals/Goals';
import './App.css';

type Page = 'dashboard' | 'accounts' | 'transactions' | 'budgets' | 'goals';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const { loadFromStorage, initializeDefaultData } = useStore();

  useEffect(() => {
    loadFromStorage();
    const storedUser = localStorage.getItem('tracker_user');
    if (!storedUser) {
      initializeDefaultData();
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'accounts': return <Accounts />;
      case 'transactions': return <Transactions />;
      case 'budgets': return <Budgets />;
      case 'goals': return <Goals />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="app-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
