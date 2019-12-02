import React from "react";
import PageHeader from "../components/PageHeader";
import UnitModel, { Units } from "../model/unit";
import { Typography, Divider, Grid } from "@material-ui/core";
import Unit from "../components/Unit";

interface Props {
  units: Units;
}

export function UnitGrid(props: Props) {
  const { units } = props;

  return (
    <React.Fragment>
      <PageHeader title="Units" />
      {Object.keys(units)
        .sort((a: string, b: string) => (a < b ? -1 : 1))
        .map((key: string) => (
          <div key={key}>
            <Typography variant="h5" gutterBottom>
              {key}
            </Typography>

            <Grid container spacing={2} direction="row">
              {units[key]
                .sort((a: UnitModel, b: UnitModel) =>
                  a.points === b.points
                    ? a.name < b.name
                      ? -1
                      : 1
                    : a.points < b.points
                    ? -1
                    : 1
                )
                .map((unit: UnitModel) => (
                  <Grid item key={unit.ldf} sm={3}>
                    <Unit unit={unit} />
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
