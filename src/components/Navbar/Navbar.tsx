import './Navbar.css';

type Page = 'dashboard' | 'accounts' | 'transactions' | 'budgets' | 'goals';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const PAGES: { id: Page; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'accounts', icon: '🏦', label: 'Comptes' },
  { id: 'transactions', icon: '💸', label: 'Transactions' },
  { id: 'budgets', icon: '🎯', label: 'Budgets' },
  { id: 'goals', icon: '🏆', label: 'Objectifs' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button type="button" className="navbar-brand" onClick={() => onNavigate('dashboard')}>
          <span className="navbar-logo">€</span>
          <span className="navbar-title">Track€r</span>
        </button>
        <div className="navbar-links">
          {PAGES.map(page => (
            <button
              key={page.id}
              type="button"
              className={`navbar-link ${currentPage === page.id ? 'navbar-link--active' : ''}`}
              onClick={() => onNavigate(page.id)}
            >
              <span className="navbar-link-icon">{page.icon}</span>
              <span className="navbar-link-label">{page.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
