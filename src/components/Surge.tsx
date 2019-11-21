import React from "react";
import { Grid } from "@material-ui/core";
import { Surge as SurgeModel } from "../model";
import { capitalize } from "../util";

interface SurgeProps {
  surge: SurgeModel;
}

export default function Surge(props: SurgeProps) {
  const { surge } = props;
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>Surge:</Grid>
      {surge.attack && (
        <Grid item>
          Attack: {capitalize(surge.attack)}
          {surge.defense && ","}
        </Grid>
      )}
      {surge.defense && <Grid item>Defense: {capitalize(surge.defense)}</Grid>}
    </Grid>
  );
}
