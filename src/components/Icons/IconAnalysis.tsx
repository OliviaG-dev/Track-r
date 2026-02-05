interface IconProps {
  size?: number;
  className?: string;
}

export function IconAnalysis({ size = 20, className }: IconProps) {
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
      {/* Courbe d’évolution = analyse / tendance */}
      <path d="M3 17l4-4 4 2 6-8 4 2" />
      <path d="M3 21h18" />
    </svg>
  );
}
