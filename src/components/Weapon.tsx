import React from "react";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { Weapon as WeaponModel, Range as RangeModel } from "../model";
import Surge from "./Surge";

interface RangeProps {
  range: RangeModel;
}

function Range(props: RangeProps) {
  const { range } = props;
  let str = "";
  if (range.to === 0) {
    str = "Melee";
  } else {
    str = `${range.from === 0 ? "Melee" : range.from}`;
    if (range.from !== range.to) {
      str = `${str}${range.from === 0 ? " / " : " - "}`;
      str = `${str}${range.to ? range.to : "∞"}`;
    }
  }

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>Range: {str}</Grid>
    </Grid>
  );
}

interface KeywordsProps {
  keywords: string[];
}

function Keywords(props: KeywordsProps) {
  const { keywords } = props;
  return <div>Keywords: {keywords.join(", ")}</div>;
}

interface Props {
  weapon: WeaponModel;
}

export default function Weapon(props: Props) {
  const { weapon } = props;
  return (
    <Card raised>
      {weapon.name && <CardHeader title={weapon.name} />}
      <CardContent>
        <Range range={weapon.range} />
        {weapon.surge && <Surge surge={weapon.surge} />}
        {weapon.keywords && <Keywords keywords={weapon.keywords} />}
      </CardContent>
    </Card>
  );
}
