import React from "react";
import PageHeader from "../components/PageHeader";
import UpgradeModel from "../model/upgrade";
import { Typography, Grid, Divider } from "@material-ui/core";
import UpgradeCard from "../components/UpgradeCard";
import {useLegionData} from "../data/LegionDataStore";


export default function UpgradeGrid() {
  const { upgrades } = useLegionData();
  return (
    <React.Fragment>
      <PageHeader title="Upgrades" />
      {Object.keys(upgrades)
        .sort((a: string, b: string) => (a < b ? -1 : 1))
        .map((key: string) => (
          <div key={`upgrade-group-${key}`}>
            <Typography variant="h5" gutterBottom>
              {key}
            </Typography>
            <Grid container spacing={2} direction="row">
              {upgrades[key]
                .sort((a: UpgradeModel, b: UpgradeModel) =>
                  a.points === b.points
                    ? a.name < b.name
                      ? -1
                      : 1
                    : a.points < b.points
                    ? -1
                    : 1
                )
                .map((upgrade: UpgradeModel) => (
                  <Grid item key={`upgrade-${upgrade.ldf}`} sm={12} lg={3}>
                    <UpgradeCard upgrade={upgrade} />
                  </Grid>
                ))}
            </Grid>
            <br />
            <Divider />
            <br />
          </div>
        ))}
    </React.Fragment>
  );
}
