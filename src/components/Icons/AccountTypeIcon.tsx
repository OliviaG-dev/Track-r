import type { AccountType } from "@/types";
import { IconAccounts } from "./IconAccounts";
import { IconMoney } from "./IconMoney";
import { IconCard } from "./IconCard";

interface AccountTypeIconProps {
  type: AccountType;
  size?: number;
  className?: string;
}

const ICON_MAP = {
  checking: IconAccounts,
  savings: IconMoney,
  cash: IconMoney,
  card: IconCard,
} as const;

export function AccountTypeIcon({
  type,
  size = 20,
  className,
}: AccountTypeIconProps) {
  const Icon = ICON_MAP[type] ?? IconAccounts;
  return <Icon size={size} className={className} />;
}
