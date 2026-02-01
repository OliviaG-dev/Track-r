import { useMemo } from 'react';
import { useStore } from '@/store';
import { FinanceService } from '@/services/finance.service';
import { formatCurrency } from '@/utils/helpers';
import StatCard from '@/components/StatCard/StatCard';
import Card from '@/components/Card/Card';
import './Dashboard.css';

export default function Dashboard() {
  const { accounts, transactions, categories, budgets } = useStore();

  const stats = useMemo(() => {
    return FinanceService.getDashboardStats(transactions, accounts, categories);
  }, [transactions, accounts, categories]);

  const insights = useMemo(() => {
    return FinanceService.generateInsights(transactions, accounts, budgets, categories);
  }, [transactions, accounts, budgets, categories]);

  if (accounts.length === 0) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <Card>
          <div className="dashboard-empty">
            <span className="dashboard-empty-icon">📊</span>
            <h2>Bienvenue sur Track€r !</h2>
            <p>Commencez par créer votre premier compte pour suivre vos finances.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Vue d'ensemble de vos finances</p>
      </div>

      <div className="dashboard-stats">
        <StatCard
          icon="💰"
          label="Solde total"
          value={formatCurrency(stats.totalBalance)}
          color="#667eea"
        />
        <StatCard
          icon="📈"
          label="Revenus du mois"
          value={formatCurrency(stats.monthlyIncome)}
          color="#51cf66"
        />
        <StatCard
          icon="📉"
          label="Dépenses du mois"
          value={formatCurrency(stats.monthlyExpenses)}
          color="#ff6b6b"
        />
        <StatCard
          icon="💎"
          label="Épargne nette"
          value={formatCurrency(stats.netSavings)}
          trend={{
            value: stats.netSavings >= 0 ? 'Positif' : 'Négatif',
            isPositive: stats.netSavings >= 0,
          }}
          color="#4ecdc4"
        />
      </div>

      {insights.length > 0 && (
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">💡 Insights</h2>
          <div className="dashboard-insights">
            {insights.map(insight => (
              <Card key={insight.id} className={`insight-card insight-card--${insight.type}`}>
                <div className="insight-header">
                  <span className="insight-icon">{insight.icon}</span>
                  <h3 className="insight-title">{insight.title}</h3>
                </div>
                <p className="insight-description">{insight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">📊 Dépenses par catégorie</h2>
        {stats.expensesByCategory.length > 0 ? (
          <Card>
            <div className="expenses-list">
              {stats.expensesByCategory.slice(0, 5).map(expense => {
                const category = categories.find(c => c.id === expense.categoryId);
                return (
                  <div key={expense.categoryId} className="expense-item">
                    <div className="expense-item-header">
                      {category && <span className="expense-item-icon">{category.icon}</span>}
                      <span className="expense-item-name">{expense.categoryName}</span>
                    </div>
                    <div className="expense-item-amount">
                      <span className="expense-item-value">{formatCurrency(expense.amount)}</span>
                      <span className="expense-item-percentage">{expense.percentage.toFixed(0)}%</span>
                    </div>
                    <div className="expense-item-bar">
                      <div
                        className="expense-item-bar-fill"
                        style={{
                          width: `${expense.percentage}%`,
                          background: category?.color || '#667eea',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card>
            <p className="dashboard-no-data">Aucune dépense ce mois-ci</p>
          </Card>
        )}
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">📈 Évolution du solde</h2>
        <Card>
          <div className="balance-evolution">
            {stats.balanceEvolution.map((item, index) => (
              <div key={index} className="balance-evolution-item">
                <span className="balance-evolution-date">{item.date}</span>
                <span className="balance-evolution-value">{formatCurrency(item.balance)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
