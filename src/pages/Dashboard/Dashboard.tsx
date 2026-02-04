import { useMemo, useState } from "react";
import { useStore } from "@/store";
import { FinanceService } from "@/services/finance.service";
import { formatCurrency } from "@/utils/helpers";
import StatCard from "@/components/StatCard/StatCard";
import Card from "@/components/Card/Card";
import {
  IconDashboard,
  IconMoney,
  IconChartUp,
  IconChartDown,
  IconDiamond,
  IconLightbulb,
  IconWarning,
  IconCheck,
  IconAlert,
} from "@/components/Icons";
import "./Dashboard.css";

function getDonutSegmentPath(
  startPct: number,
  endPct: number,
  outerR = 100,
  innerR = 44,
  cx = 100,
  cy = 100
): string {
  const startRad = (startPct / 100) * 2 * Math.PI - Math.PI / 2;
  const endRad = (endPct / 100) * 2 * Math.PI - Math.PI / 2;
  const largeArc = endPct - startPct > 50 ? 1 : 0;
  const x1 = cx + outerR * Math.cos(startRad);
  const y1 = cy + outerR * Math.sin(startRad);
  const x2 = cx + outerR * Math.cos(endRad);
  const y2 = cy + outerR * Math.sin(endRad);
  const x3 = cx + innerR * Math.cos(endRad);
  const y3 = cy + innerR * Math.sin(endRad);
  const x4 = cx + innerR * Math.cos(startRad);
  const y4 = cy + innerR * Math.sin(startRad);
  return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

function InsightIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    "💰": <IconMoney size={24} />,
    "⚠️": <IconWarning size={24} />,
    "🚨": <IconAlert size={24} />,
    "✅": <IconCheck size={24} />,
  };
  return <>{map[icon] ?? <IconLightbulb size={24} />}</>;
}

export default function Dashboard() {
  const { accounts, transactions, categories, budgets } = useStore();
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const stats = useMemo(() => {
    return FinanceService.getDashboardStats(transactions, accounts, categories);
  }, [transactions, accounts, categories]);

  const insights = useMemo(() => {
    return FinanceService.generateInsights(
      transactions,
      accounts,
      budgets,
      categories
    );
  }, [transactions, accounts, budgets, categories]);

  if (accounts.length === 0) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <Card>
          <div className="dashboard-empty">
            <span className="dashboard-empty-icon">
              <IconDashboard size={48} />
            </span>
            <h2>Bienvenue sur Track€r !</h2>
            <p>
              Commencez par créer votre premier compte pour suivre vos finances.
            </p>
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
          icon={<IconMoney size={28} />}
          label="Solde total"
          value={formatCurrency(stats.totalBalance)}
          color="#00BFFF"
        />
        <StatCard
          icon={<IconChartUp size={28} />}
          label="Revenus du mois"
          value={formatCurrency(stats.monthlyIncome)}
          color="#32CD32"
        />
        <StatCard
          icon={<IconChartDown size={28} />}
          label="Dépenses du mois"
          value={formatCurrency(stats.monthlyExpenses)}
          color="#ff6b6b"
        />
        <StatCard
          icon={<IconDiamond size={28} />}
          label="Épargne nette"
          value={formatCurrency(stats.netSavings)}
          trend={{
            value: stats.netSavings >= 0 ? "Positif" : "Négatif",
            isPositive: stats.netSavings >= 0,
          }}
          color="#4ecdc4"
        />
      </div>

      {insights.length > 0 && (
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">
            <IconLightbulb size={24} /> Insights
          </h2>
          <div className="dashboard-insights">
            {insights.map((insight) => (
              <Card
                key={insight.id}
                className={`insight-card insight-card--${insight.type}`}
              >
                <div className="insight-header">
                  <span className="insight-icon">
                    <InsightIcon icon={insight.icon} />
                  </span>
                  <h3 className="insight-title">{insight.title}</h3>
                </div>
                <p className="insight-description">{insight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-section dashboard-section-expenses">
        <h2 className="dashboard-section-title">
          <IconDashboard size={24} /> Dépenses par catégorie
        </h2>
        {stats.expensesByCategory.length > 0 ? (
          <div className="expenses-by-category-wrapper">
            <Card className="expenses-list-card">
              <div className="expenses-list">
                {stats.expensesByCategory.slice(0, 5).map((expense) => {
                  const category = categories.find(
                    (c) => c.id === expense.categoryId
                  );
                  return (
                    <div key={expense.categoryId} className="expense-item">
                      <div className="expense-item-header">
                        {category && (
                          <span className="expense-item-icon">
                            {category.icon}
                          </span>
                        )}
                        <span className="expense-item-name">
                          {expense.categoryName}
                        </span>
                      </div>
                      <div className="expense-item-amount">
                        <span className="expense-item-value">
                          {formatCurrency(expense.amount)}
                        </span>
                        <span className="expense-item-percentage">
                          {expense.percentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="expense-item-bar">
                        <div
                          className="expense-item-bar-fill"
                          style={{
                            width: `${expense.percentage}%`,
                            background: category?.color || "#00BFFF",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card className="expenses-chart-card">
              <p className="expenses-chart-label">Répartition du mois</p>
              <div className="expenses-pie-chart-wrap">
                <svg
                  className="expenses-pie-svg"
                  viewBox="0 0 200 200"
                  aria-label="Répartition des dépenses par catégorie"
                >
                  {stats.expensesByCategory.map((expense, i) => {
                    const category = categories.find(
                      (c) => c.id === expense.categoryId
                    );
                    const startPct =
                      stats.expensesByCategory
                        .slice(0, i)
                        .reduce((s, e) => s + e.percentage, 0) || 0;
                    const endPct = startPct + expense.percentage;
                    const isHovered = hoveredSegment === i;
                    return (
                      <path
                        key={expense.categoryId}
                        d={getDonutSegmentPath(startPct, endPct)}
                        fill={category?.color || "#00BFFF"}
                        className={`expenses-pie-segment ${
                          isHovered ? "expenses-pie-segment--hover" : ""
                        }`}
                        onMouseEnter={() => setHoveredSegment(i)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    );
                  })}
                  <g className="expenses-pie-center">
                    <circle
                      cx="100"
                      cy="100"
                      r="44"
                      fill="white"
                      className="expenses-pie-center-bg"
                    />
                    {hoveredSegment !== null ? (
                      <g className="expenses-pie-center-content">
                        <text
                          x="100"
                          y="96"
                          textAnchor="middle"
                          className="expenses-pie-center-pct"
                        >
                          {stats.expensesByCategory[
                            hoveredSegment
                          ].percentage.toFixed(0)}
                          %
                        </text>
                        <text
                          x="100"
                          y="112"
                          textAnchor="middle"
                          className="expenses-pie-center-name"
                        >
                          {
                            stats.expensesByCategory[hoveredSegment]
                              .categoryName
                          }
                        </text>
                      </g>
                    ) : (
                      <text
                        x="100"
                        y="100"
                        textAnchor="middle"
                        className="expenses-pie-center-hint"
                      >
                        Survoler
                      </text>
                    )}
                  </g>
                </svg>
              </div>
              <div className="expenses-pie-legend">
                {stats.expensesByCategory.map((expense) => {
                  const category = categories.find(
                    (c) => c.id === expense.categoryId
                  );
                  return (
                    <div
                      key={expense.categoryId}
                      className="expenses-pie-legend-item"
                    >
                      <span
                        className="expenses-pie-legend-dot"
                        style={{
                          background: category?.color || "#00BFFF",
                        }}
                      />
                      <span className="expenses-pie-legend-label">
                        {expense.categoryName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        ) : (
          <Card>
            <p className="dashboard-no-data">Aucune dépense ce mois-ci</p>
          </Card>
        )}
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">
          <IconChartUp size={24} /> Évolution du solde
        </h2>
        <Card>
          <div className="balance-evolution">
            {stats.balanceEvolution.map((item, index) => (
              <div key={index} className="balance-evolution-item">
                <span className="balance-evolution-date">{item.date}</span>
                <span className="balance-evolution-value">
                  {formatCurrency(item.balance)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
