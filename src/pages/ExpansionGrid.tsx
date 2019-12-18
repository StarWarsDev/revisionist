import React from "react";
import { LdfNamePair } from "../model";
import { Grid } from "@material-ui/core";
import ExpansionCard from "../components/ExpansionCard";
import Expansion from "../model/expansion";
import PageHeader from "../components/PageHeader";
import {useLegionData} from "../data/LegionDataStore";

interface Props {
  unitNameMap: LdfNamePair;
  upgradeNameMap: LdfNamePair;
}

function sorter(a: Expansion, b: Expansion): number {
  // if the waves are the same then sort on name
  if (a.wave === b.wave) {
    return a.name < b.name ? -1 : 1;
  }

  // sort on wave
  return a.wave < b.wave ? -1 : 1;
}

export default function ExpansionGrid(props: Props) {
  const { sources: expansions } = useLegionData();
  const { unitNameMap, upgradeNameMap } = props;

  const findUnitName = (ldf: string): string => {
    const name: string = unitNameMap[ldf];
    if (!name) {
      return ldf;
    }
    return name;
  };

  const findUpgradeName = (ldf: string): string => {
    const name: string = upgradeNameMap[ldf];
    if (!name) {
      return ldf;
    }
    return name;
  };

  return (
    <React.Fragment>
      <PageHeader title="Expansions" />
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        {/* Expansions */}
        {expansions.sort(sorter).map((expansion: Expansion) => (
          <Grid key={expansion.ldf} item xs={12}>
            <ExpansionCard
              data={expansion}
              lookupUnitName={findUnitName}
              lookupUpgradeName={findUpgradeName}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
