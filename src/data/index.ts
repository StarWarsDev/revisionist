import LegionData from "../model";
import legionData from "../legion-data.json";

export function getLegionData(): LegionData {
  return legionData;
}

export function getEmptyLegionData(): LegionData {
  return {
    units: {},
    upgrades: {},
    sources: [],
    commandCards: []
  };
}
