import { Weapon } from ".";

interface CommandCard {
  ldf: string;
  name: string;
  pips: Number;
  orders: string;
  description?: string;
  weapon?: Weapon;
}

export default CommandCard;
