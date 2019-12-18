import LegionData from "../model";

export async function fetchLegionDataForVersion(version: string): Promise<LegionData> {
  const resp = await fetch(`https://cdn.jsdelivr.net/gh/andrelind/legion-data@${version}/out/legion-data.json`);
  return await resp.json();
}

export function getEmptyLegionData(): LegionData {
  return {
    units: {},
    upgrades: {},
    sources: [],
    commandCards: []
  };
}
