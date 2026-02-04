interface IconProps {
  size?: number;
  className?: string;
}

export function IconLightbulb({ size = 20, className }: IconProps) {
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
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.5 8.5c.5-2.5.5-5-1-7s-4-2-5.5-1c-1.5 1-2 3.5-1 6 .5 1.5 1 2.5 2 3.5 1 1 2 1.5 3 2" />
      <path d="M8.5 8.5c-.5-2.5-.5-5 1-7s4-2 5.5-1c1.5 1 2 3.5 1 6-.5 1.5-1 2.5-2 3.5-1 1-2 1.5-3 2" />
      <path d="M12 2v2" />
    </svg>
  );
}
