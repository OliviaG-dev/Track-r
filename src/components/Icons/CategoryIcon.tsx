import { IconBox } from "./IconBox";
import { IconMoney } from "./IconMoney";
import { IconCategoryFood } from "./IconCategoryFood";
import { IconCategoryTransport } from "./IconCategoryTransport";
import { IconCategoryHousing } from "./IconCategoryHousing";
import { IconCategoryLeisure } from "./IconCategoryLeisure";
import { IconCategoryHealth } from "./IconCategoryHealth";
import { IconCategoryShopping } from "./IconCategoryShopping";
import { IconCategoryBills } from "./IconCategoryBills";
import { IconCategorySalary } from "./IconCategorySalary";
import { IconCategoryFreelance } from "./IconCategoryFreelance";
import { IconCategoryGift } from "./IconCategoryGift";

export type CategoryIconType =
  | "food"
  | "transport"
  | "housing"
  | "leisure"
  | "health"
  | "shopping"
  | "bills"
  | "other"
  | "salary"
  | "freelance"
  | "gift"
  | "other-income";

interface CategoryIconProps {
  type: string;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  food: IconCategoryFood,
  transport: IconCategoryTransport,
  housing: IconCategoryHousing,
  leisure: IconCategoryLeisure,
  health: IconCategoryHealth,
  shopping: IconCategoryShopping,
  bills: IconCategoryBills,
  other: IconBox,
  salary: IconCategorySalary,
  freelance: IconCategoryFreelance,
  gift: IconCategoryGift,
  "other-income": IconMoney,
};

const EMOJI_TO_KEY: Record<string, string> = {
  "🍔": "food",
  "🚗": "transport",
  "🏠": "housing",
  "🎮": "leisure",
  "⚕️": "health",
  "🛍️": "shopping",
  "📄": "bills",
  "📦": "other",
  "💼": "salary",
  "💻": "freelance",
  "🎁": "gift",
  "💰": "other-income",
};

export function CategoryIcon({
  type,
  size = 20,
  className,
}: CategoryIconProps) {
  const key = EMOJI_TO_KEY[type] ?? type;
  const Icon = ICON_MAP[key] ?? IconBox;
  return <Icon size={size} className={className} />;
}
