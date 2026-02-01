import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, title, subtitle, icon, className = '', onClick }: CardProps) {
  return (
    <div className={`card ${onClick ? 'card--clickable' : ''} ${className}`} onClick={onClick}>
      {(title || subtitle || icon) && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          <div className="card-header-text">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
