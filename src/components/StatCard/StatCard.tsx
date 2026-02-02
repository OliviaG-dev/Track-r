import "./StatCard.css";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  trend,
  color = "#00BFFF",
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div
        className="stat-card-icon"
        style={{ background: `${color}20`, color }}
      >
        {icon}
      </div>
      <div className="stat-card-content">
        <p className="stat-card-label">{label}</p>
        <h3 className="stat-card-value">{value}</h3>
        {trend && (
          <span
            className={`stat-card-trend ${
              trend.isPositive
                ? "stat-card-trend--positive"
                : "stat-card-trend--negative"
            }`}
          >
            {trend.isPositive ? "↗" : "↘"} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
