import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string;
  className?: string;
  contentClassName?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  className = "",
  contentClassName = "",
  onClick,
}: CardProps) {
  return (
    <div
      className={`card ${onClick ? "card--clickable" : ""} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle || icon) && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          <div className="card-header-text">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      <div
        className={
          contentClassName ? `card-content ${contentClassName}` : "card-content"
        }
      >
        {children}
      </div>
    </div>
  );
}
