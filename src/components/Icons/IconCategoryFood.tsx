interface IconProps {
  size?: number;
  className?: string;
}

export function IconCategoryFood({ size = 20, className }: IconProps) {
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
      {/* Corps de la pomme */}
      <path
        d="M12 4c-3 0-5 2-5 6 0 4.5 2 8 5 8s5-3.5 5-8c0-4-2-6-5-6Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path d="M12 4v2" />
      <path d="M7 10c0 2.5 2 4.5 5 5 3-.5 5-2.5 5-5" />
      {/* Tige */}
      <path d="M12 3v2" />
      <path d="M11.5 3h1" />
      {/* Feuille */}
      <path d="M13 4.5c1 .5 1.5 1.5 1 2.5-.5 1-1.5 1.2-2 .5" />
    </svg>
  );
}
