import React from "react";
import LegionData from "./model";
import { Grid } from "@material-ui/core";
import SourceCard from "./SourceCard";
import Source from "./model/source";
import Upgrade from "./model/upgrade";
import Unit from "./model/unit";

interface Props {
  data: LegionData;
}

function sorter(a: Source, b: Source): number {
  // if the waves are the same then sort on name
  if (a.wave === b.wave) {
    return a.name < b.name ? -1 : 1;
  }

  // sort on wave
  return a.wave < b.wave ? -1 : 1;
}

export default function SourceGrid(props: Props) {
  const { data } = props;

  const findUnitName = (ldf: string): string => {
    let name: string = "";

    Object.keys(data.units).forEach((slot: string) => {
      if (name === "") {
        const units = data.units[slot].filter((unit: Unit) => unit.ldf === ldf);
        if (units.length === 1) {
          name = units[0].name;
        }
      }
    });

    if (name !== "") {
      return name;
    }

    return ldf;
  };

  const findUpgradeName = (ldf: string): string => {
    let name: string = "";

    Object.keys(data.upgrades).forEach((slot: string) => {
      if (name === "") {
        const upgrades = data.upgrades[slot].filter(
          (upgrade: Upgrade) => upgrade.ldf === ldf
        );
        if (upgrades.length === 1) {
          name = upgrades[0].name;
        }
      }
    });

    if (name !== "") {
      return name;
    }

    return ldf;
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="space-between"
      alignItems="stretch"
    >
      {/* Sources */}
      {data.sources.sort(sorter).map((source: Source) => (
        <Grid key={source.ldf} item xs={12} lg={6}>
          <SourceCard
            data={source}
            lookupUnitName={findUnitName}
            lookupUpgradeName={findUpgradeName}
          />
        </Grid>
      ))}
    </Grid>
  );
}
