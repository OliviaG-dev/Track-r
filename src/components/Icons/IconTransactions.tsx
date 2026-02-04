interface IconProps {
  size?: number;
  className?: string;
}

export function IconTransactions({ size = 20, className }: IconProps) {
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
      <path d="M7 17 2 12l5-5" />
      <path d="M17 7l5 5-5 5" />
      <path d="M2 12h20" />
    </svg>
  );
}
