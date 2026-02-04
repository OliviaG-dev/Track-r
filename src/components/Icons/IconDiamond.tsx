interface IconProps {
  size?: number;
  className?: string;
}

export function IconDiamond({ size = 20, className }: IconProps) {
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
      <path d="M12 3 3 9l9 12 9-12-9-6Z" />
      <path d="M3 9h18" />
      <path d="M12 3v18" />
    </svg>
  );
}
