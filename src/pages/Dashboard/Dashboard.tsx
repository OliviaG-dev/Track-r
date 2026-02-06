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
  IconAnalysis,
  IconDiamond,
  IconLightbulb,
  IconWarning,
  IconCheck,
  IconAlert,
  CategoryIcon,
} from "@/components/Icons";
import "./Dashboard.css";

const BALANCE_CHART_PADDING = { left: 52, right: 24, top: 32, bottom: 44 };
const BALANCE_CHART_VIEW = { width: 800, height: 240 };
const Y_AXIS_STEP = 2000;

function formatAxisLabel(value: number): string {
  if (value === 0) return "0";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${sign}${Math.round(abs / 1_000_000)} M`;
  if (abs >= 1_000) return `${sign}${Math.round(abs / 1_000)} k`;
  return `${sign}${Math.round(abs)}`;
}

function useBalanceChartData(
  evolution: { date: string; balance: number }[],
  formatCurrency: (n: number) => string
) {
  return useMemo(() => {
    if (evolution.length === 0)
      return {
        path: "",
        fillPath: "",
        points: [],
        minY: 0,
        maxY: 0,
        gridLines: [] as number[],
        yLabels: [] as { y: number; value: number }[],
        chartLeft: 0,
        chartTop: 0,
        chartW: 0,
        chartH: 0,
      };
    const { left, right, top, bottom } = BALANCE_CHART_PADDING;
    const w = BALANCE_CHART_VIEW.width - left - right;
    const h = BALANCE_CHART_VIEW.height - top - bottom;
    const balances = evolution.map((e) => e.balance);
    const dataMin = Math.min(...balances);
    const dataMax = Math.max(...balances);
    const minLabel =
      dataMin >= 0 ? 0 : Math.floor(dataMin / Y_AXIS_STEP) * Y_AXIS_STEP;
    const maxLabel =
      dataMax <= 0 ? 0 : Math.ceil(dataMax / Y_AXIS_STEP) * Y_AXIS_STEP;
    const low = Math.min(minLabel, dataMin);
    const high = Math.max(maxLabel, dataMax);
    const ticks: number[] = [];
    for (let v = minLabel; v <= maxLabel; v += Y_AXIS_STEP) {
      ticks.push(v);
    }
    if (ticks.length === 0) ticks.push(0);
    const range = high - low || 1;
    const n = evolution.length;
    const points = evolution.map((e, i) => {
      const x = left + (n === 1 ? w / 2 : (i / (n - 1)) * w);
      const y = top + h - ((e.balance - low) / range) * h;
      return { x, y, ...e };
    });
    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const fillPath = `${linePath} L ${left + w} ${top + h} L ${left} ${
      top + h
    } Z`;
    const gridLines = ticks.slice(1).map((value) => {
      const frac = (value - low) / range;
      return top + h * (1 - frac);
    });
    const yLabels = ticks.map((value) => {
      const frac = (value - low) / range;
      const y = top + h * (1 - frac);
      return { y, value };
    });
    return {
      path: linePath,
      fillPath,
      points,
      minY: low,
      maxY: high,
      gridLines,
      yLabels,
      chartLeft: left,
      chartTop: top,
      chartW: w,
      chartH: h,
    };
  }, [evolution, formatCurrency]);
}

function BalanceEvolutionSvg({
  evolution,
  formatCurrency,
}: {
  evolution: { date: string; balance: number }[];
  formatCurrency: (n: number) => string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartData = useBalanceChartData(evolution, formatCurrency);
  const { path, fillPath, points, gridLines, yLabels, chartLeft, chartW } =
    chartData;
  const { width, height } = BALANCE_CHART_VIEW;

  if (evolution.length === 0) return null;

  const tooltipHeight = 34;
  const tooltipAbove = (py: number) => py - tooltipHeight - 10;
  const tooltipBelow = (py: number) => py + 18;

  return (
    <svg
      className="balance-evolution-svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      aria-label="Évolution du solde"
    >
      <defs>
        <linearGradient id="balance-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4c654" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f4c654" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {/* Grille horizontale */}
      {gridLines.map((y, i) => (
        <line
          key={i}
          x1={chartLeft}
          y1={y}
          x2={chartLeft + chartW}
          y2={y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {/* Labels axe Y */}
      {yLabels.map(({ y, value }, i) => (
        <text
          key={i}
          x={chartLeft - 8}
          y={y + 4}
          textAnchor="end"
          fill="#6b7280"
          fontSize="10"
          fontWeight="600"
          className="balance-evolution-axis-label"
        >
          {formatAxisLabel(value)}
        </text>
      ))}
      {/* Dates axe X */}
      {points.map((p, i) => (
        <text
          key={`label-${i}`}
          x={p.x}
          y={height - 12}
          textAnchor="middle"
          fill="#6b7280"
          fontSize="10"
          fontWeight="600"
        >
          {p.date}
        </text>
      ))}
      <path d={fillPath} fill="url(#balance-chart-fill)" />
      <path
        d={path}
        fill="none"
        stroke="#f4c654"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <g
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <circle
            cx={p.x}
            cy={p.y}
            r={hoveredIndex === i ? 7 : 5}
            fill="#15171b"
            stroke="#f4c654"
            strokeWidth="2.5"
            className="balance-evolution-point"
          />
          {hoveredIndex === i &&
            (() => {
              const showBelow = p.y < height * 0.4;
              const ty = showBelow ? tooltipBelow(p.y) : tooltipAbove(p.y);
              const text1Y = ty + 14;
              const text2Y = ty + 26;
              return (
                <g className="balance-evolution-tooltip">
                  <rect
                    x={p.x - 52}
                    y={ty}
                    width={104}
                    height={tooltipHeight}
                    rx={8}
                    fill="rgba(21, 23, 27, 0.96)"
                    stroke="rgba(244, 198, 84, 0.4)"
                    strokeWidth="1"
                  />
                  <text
                    x={p.x}
                    y={text1Y}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="700"
                  >
                    {formatCurrency(p.balance)}
                  </text>
                  <text
                    x={p.x}
                    y={text2Y}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.85)"
                    fontSize="10"
                  >
                    {p.date}
                  </text>
                </g>
              );
            })()}
        </g>
      ))}
    </svg>
  );
}

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

function formatInsightDescription(text: string) {
  const parts = text.split(/(\d+%)/g);
  return parts.map((part, i) =>
    /\d+%/.test(part) ? (
      <span key={i} className="insight-percentage-value">
        {part}
      </span>
    ) : (
      part
    )
  );
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
          color="#f4c654"
        />
        <StatCard
          icon={<IconChartUp size={28} />}
          label="Revenus du mois"
          value={formatCurrency(stats.monthlyIncome)}
          color="#34d399"
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
          color="#f4c654"
        />
      </div>

      {insights.length > 0 && (
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">
            <IconAnalysis size={24} /> Analyse
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
                <p className="insight-description">
                  {formatInsightDescription(insight.description)}
                </p>
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
              <p className="expenses-list-label">Détail des dépenses</p>
              <div className="expenses-list">
                {stats.expensesByCategory.slice(0, 5).map((expense, index) => {
                  const category = categories.find(
                    (c) => c.id === expense.categoryId
                  );
                  return (
                    <div
                      key={expense.categoryId}
                      className="expense-item"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        ["--bar-width" as string]: `${expense.percentage}%`,
                      }}
                    >
                      <div className="expense-item-header">
                        {category && (
                          <span
                            className="expense-item-icon"
                            style={{
                              color: category.color,
                              backgroundColor: `${category.color}20`,
                            }}
                          >
                            <CategoryIcon type={category.icon} size={20} />
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
                            background: category?.color || "#f4c654",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card
              className="expenses-chart-card"
              contentClassName="expenses-chart-card-content"
            >
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
                        fill={category?.color || "#f4c654"}
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
                          background: category?.color || "#f4c654",
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
        <Card className="balance-evolution-card">
          <div className="balance-evolution">
            {stats.balanceEvolution.map((item, index) => (
              <div
                key={index}
                className={`balance-evolution-item ${
                  index === stats.balanceEvolution.length - 1
                    ? "balance-evolution-item--current"
                    : ""
                }`}
              >
                <span className="balance-evolution-date">{item.date}</span>
                <span
                  className={`balance-evolution-value ${
                    item.balance >= 0
                      ? "balance-evolution-value--positive"
                      : "balance-evolution-value--negative"
                  }`}
                >
                  {formatCurrency(item.balance)}
                </span>
              </div>
            ))}
          </div>
          <div className="balance-evolution-chart">
            <BalanceEvolutionSvg
              evolution={stats.balanceEvolution}
              formatCurrency={formatCurrency}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
