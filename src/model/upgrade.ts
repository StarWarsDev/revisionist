import { Keyword, Side, Slot } from "./index";

interface UpgradeRestrictions {
  ldf: string;
  name: string;
}

export default interface Upgrade {
  ldf: string;
  name: string;
  unique?: boolean;
  description?: string;
  side: Side;
  exhaust?: boolean;
  restrictions?: UpgradeRestrictions;
  slot: Slot;
  points: Number;
  keywords: Keyword[];
}

export interface Upgrades {
  [slot: string]: Upgrade[];
}
