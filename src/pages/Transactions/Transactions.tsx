import { useState, useMemo } from 'react';
import { useStore } from '@/store';
import { formatCurrency, formatDate } from '@/utils/helpers';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Modal from '@/components/Modal/Modal';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import './Transactions.css';

export default function Transactions() {
  const { transactions, accounts, categories, addTransaction, deleteTransaction, user } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    type: 'all',
    accountId: 'all',
    categoryId: 'all',
    search: '',
  });
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    accountId: '',
    categoryId: '',
    description: '',
  });

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        if (filter.type !== 'all' && t.type !== filter.type) return false;
        if (filter.accountId !== 'all' && t.accountId !== filter.accountId) return false;
        if (filter.categoryId !== 'all' && t.categoryId !== filter.categoryId) return false;
        if (filter.search) {
          const searchLower = filter.search.toLowerCase();
          const category = categories.find(c => c.id === t.categoryId);
          const account = accounts.find(a => a.id === t.accountId);
          return (
            t.description?.toLowerCase().includes(searchLower) ||
            category?.name.toLowerCase().includes(searchLower) ||
            account?.name.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filter, categories, accounts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    addTransaction({
      ...formData,
      userId: user.id,
      date: new Date(formData.date),
    });
    
    setFormData({
      type: 'expense',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      accountId: accounts[0]?.id || '',
      categoryId: '',
      description: '',
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      deleteTransaction(id);
    }
  };

  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const availableCategories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div>
          <h1 className="transactions-title">Transactions</h1>
          <p className="transactions-subtitle">{filteredTransactions.length} transaction(s)</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          + Nouvelle transaction
        </Button>
      </div>

      <Card>
        <div className="transactions-filters">
          <Select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            options={[
              { value: 'all', label: 'Tous les types' },
              { value: 'income', label: 'Revenus' },
              { value: 'expense', label: 'Dépenses' },
            ]}
          />
          <Select
            value={filter.accountId}
            onChange={(e) => setFilter({ ...filter, accountId: e.target.value })}
            options={[
              { value: 'all', label: 'Tous les comptes' },
              ...accounts.map(acc => ({ value: acc.id, label: acc.name })),
            ]}
          />
          <Select
            value={filter.categoryId}
            onChange={(e) => setFilter({ ...filter, categoryId: e.target.value })}
            options={[
              { value: 'all', label: 'Toutes les catégories' },
              ...categories.map(cat => ({ value: cat.id, label: cat.name })),
            ]}
          />
          <Input
            icon="🔍"
            placeholder="Rechercher..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
      </Card>

      {filteredTransactions.length === 0 ? (
        <Card>
          <div className="transactions-empty">
            <span className="transactions-empty-icon">💸</span>
            <h2>Aucune transaction</h2>
            <p>Commencez par ajouter votre première transaction.</p>
            <Button onClick={() => setIsModalOpen(true)}>
              Ajouter une transaction
            </Button>
          </div>
        </Card>
      ) : (
        <div className="transactions-list">
          {filteredTransactions.map(transaction => {
            const account = accounts.find(a => a.id === transaction.accountId);
            const category = categories.find(c => c.id === transaction.categoryId);
            
            return (
              <Card key={transaction.id}>
                <div className="transaction-item">
                  <div className="transaction-item-icon" style={{ background: `${category?.color}20`, color: category?.color }}>
                    {category?.icon || '📦'}
                  </div>
                  <div className="transaction-item-content">
                    <h3 className="transaction-item-category">{category?.name || 'Inconnu'}</h3>
                    <p className="transaction-item-details">
                      {account?.name} • {formatDate(transaction.date)}
                    </p>
                    {transaction.description && (
                      <p className="transaction-item-description">{transaction.description}</p>
                    )}
                  </div>
                  <div className="transaction-item-right">
                    <span className={`transaction-item-amount ${transaction.type === 'income' ? 'income' : 'expense'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                    <button
                      className="transaction-item-delete"
                      onClick={() => handleDelete(transaction.id)}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouvelle transaction"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              Ajouter
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="transaction-form-type">
            <button
              type="button"
              className={`transaction-form-type-btn ${formData.type === 'expense' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'expense', categoryId: '' })}
            >
              📉 Dépense
            </button>
            <button
              type="button"
              className={`transaction-form-type-btn ${formData.type === 'income' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'income', categoryId: '' })}
            >
              📈 Revenu
            </button>
          </div>

          <Input
            label="Montant"
            icon="💰"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
            required
          />

          <Input
            label="Date"
            icon="📅"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <Select
            label="Compte"
            value={formData.accountId}
            onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
            options={[
              { value: '', label: '-- Sélectionner un compte --' },
              ...accounts.map(acc => ({ value: acc.id, label: acc.name })),
            ]}
          />

          <Select
            label="Catégorie"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            options={[
              { value: '', label: '-- Sélectionner une catégorie --' },
              ...availableCategories.map(cat => ({ value: cat.id, label: `${cat.icon} ${cat.name}` })),
            ]}
          />

          <Input
            label="Description (optionnelle)"
            icon="📝"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Restaurant, courses..."
          />
        </form>
      </Modal>
    </div>
  );
}
