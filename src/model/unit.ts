export default interface Unit {
  ldf: string;
  name: string;
}

export interface Units {
  [rank: string]: Unit[];
}
