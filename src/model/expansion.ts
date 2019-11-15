interface LdfCounter {
  [ldf: string]: number;
}

interface ExpansionContents {
  units?: LdfCounter;
  upgrades?: LdfCounter;
}

export default interface Expansion {
  ldf: string;
  name: string;
  wave: number;
  released: boolean;
  contents: ExpansionContents;
}
