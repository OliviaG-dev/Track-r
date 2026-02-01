import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size} ${fullWidth ? 'button--full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
