interface IconProps {
  size?: number;
  className?: string;
}

export function IconGoals({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Étoile à 5 branches : objectif, viser les étoiles */}
      <path d="M12 2 L14.5 9 L21 10 L15.5 15 L17 22 L12 18 L7 22 L8.5 15 L3 10 L9.5 9 Z" />
    </svg>
  );
}
