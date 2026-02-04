interface IconProps {
  size?: number;
  className?: string;
}

export function IconAccounts({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 9h18v12H3V9Z" />
      <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3H3V6Z" />
      <path d="M7 13h2" />
      <path d="M13 13h4" />
    </svg>
  );
}
