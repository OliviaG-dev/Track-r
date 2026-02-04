interface IconProps {
  size?: number;
  className?: string;
}

export function IconChartUp({ size = 20, className }: IconProps) {
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
      <path d="M3 17v-4h4v4H3Z" />
      <path d="M10 17V9h4v8h-4Z" />
      <path d="M17 17V3h4v14h-4Z" />
      <path d="M3 17h4M10 17h4M17 17h4" />
    </svg>
  );
}
