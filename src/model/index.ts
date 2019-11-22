import Expansion from "./expansion";
import { Upgrades } from "./upgrade";
import { Units } from "./unit";
import CommandCard from "./command-card";

export enum DefenceDice {
  RED = "red",
  WHITE = "white"
}

export enum Rank {
  COMMANDER = "Commander",
  OPERATIVE = "Operative",
  CORPS = "Corps",
  SPECIAL_FORCES = "Special Forces",
  SUPPORT = "Support",
  HEAVY = "Heavy"
}

export enum Side {
  LIGHT = "light",
  DARK = "dark",
  NEUTRAL = "neutral"
}

export enum Slot {
  ARMAMENT = "Armement",
  HEAVY_WEAPON = "Heavy Weapon",
  PERSONNEL = "Personnel",
  FORCE = "Force",
  COMMAND = "Command",
  HARDPOINT = "Hardpoint",
  GEAR = "Gear",
  GRENADES = "Grenades",
  COMMS = "Comms",
  PILOT = "Pilot",
  ELITE = "Elite",
  GENERATOR = "Generator",
  CREW = "Crew",
  GUNNER = "Gunner"
}

export interface AttackDice {
  black?: number;
  red?: number;
  white?: number;
}

export interface Keyword {
  name: string;
  description?: string;
}

export interface LdfNamePair {
  [ldf: string]: string;
}

export interface Range {
  from?: number;
  to?: number;
}

export interface Surge {
  attack?: "hit" | "crit";
  defense?: "block";
}

export interface Weapon {
  name?: string;
  range: Range;
  dice: AttackDice;
  keywords?: (string | Keyword)[];
  surge?: Surge;
}

export default interface LegionData {
  sources: Expansion[];
  upgrades: Upgrades;
  units: Units;
  commandCards: CommandCard[];
}
