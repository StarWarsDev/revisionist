import { Keyword, Side, Slot, Weapon } from "./index";

interface UpgradeRestrictions {
  ldf: string;
  name: string;
}

export default interface Upgrade {
  ldf: string;
  name: string;
  unique?: boolean;
  description?: string;
  side?: string;
  exhaust?: boolean;
  restrictions?: UpgradeRestrictions;
  slot: string;
  points: number;
  keywords?: (string | Keyword)[];
  weapon?: Weapon;
}

export interface Upgrades {
  [slot: string]: Upgrade[];
}
