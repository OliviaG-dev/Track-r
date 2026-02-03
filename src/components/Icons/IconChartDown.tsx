interface IconProps {
  size?: number;
  className?: string;
}

export function IconChartDown({ size = 20, className }: IconProps) {
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
      <path d="M3 7v4h4V7H3Z" />
      <path d="M10 7v8h4V7h-4Z" />
      <path d="M17 7v14h4V7h-4Z" />
      <path d="M3 11h4M10 15h4M17 21h4" />
    </svg>
  );
}
