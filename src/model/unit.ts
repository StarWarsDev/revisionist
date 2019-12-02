export default interface Unit {
  ldf: string;
  name: string;
  points: number;
  unique?: boolean;
  subtitle?: string;
  type: "Trooper" | "Emplacement Trooper" | "Creature Trooper" | "Vehicle";
  side: "light" | "dark" | "neutral";
}

export interface Units {
  [rank: string]: Unit[];
}
