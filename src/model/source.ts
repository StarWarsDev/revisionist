interface LdfCounter {
  [ldf: string]: number;
}

interface SourceContents {
  units?: LdfCounter;
  upgrades?: LdfCounter;
}

export default interface Source {
  ldf: string;
  name: string;
  wave: number;
  released: boolean;
  contents: SourceContents;
}
