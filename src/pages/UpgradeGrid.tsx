import React from "react";
import PageHeader from "../components/PageHeader";
import UpgradeModel, { Upgrades } from "../model/upgrade";
import { Typography, Grid } from "@material-ui/core";
import UpgradeCard from "../components/UpgradeCard";

interface Props {
  upgrades: Upgrades;
}

export default function UpgradeGrid(props: Props) {
  const { upgrades } = props;
  return (
    <React.Fragment>
      <PageHeader title="Upgrades" />
      {Object.keys(upgrades)
        .sort((a: string, b: string) => (a < b ? -1 : 1))
        .map((key: string) => (
          <div key={`upgrade-group-${key}`}>
            <Typography variant="h5">{key}</Typography>
            <Grid container spacing={1} direction="row">
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
          </div>
        ))}
    </React.Fragment>
  );
}
