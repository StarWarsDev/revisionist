import React from "react";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import {
  Weapon as WeaponModel,
  Range as RangeModel,
  Keyword,
  AttackDice
} from "../model";
import Surge from "./Surge";
import { joinKeywords } from "../util";

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
  keywords: (string | Keyword)[];
}

function Keywords(props: KeywordsProps) {
  const { keywords } = props;
  return <div>Keywords: {joinKeywords(keywords)}</div>;
}

interface DiceProps {
  dice: AttackDice;
}

function Dice(props: DiceProps) {
  const { dice } = props;
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={3}>
        Dice:
      </Grid>
      {dice.red && (
        <Grid item xs={3}>
          Red: {dice.red}
        </Grid>
      )}
      {dice.black && (
        <Grid item xs={3}>
          Black: {dice.black}
        </Grid>
      )}
      {dice.white && (
        <Grid item xs={3}>
          White: {dice.white}
        </Grid>
      )}
    </Grid>
  );
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
        <Dice dice={weapon.dice} />
        {weapon.surge && <Surge surge={weapon.surge} />}
        {weapon.keywords && <Keywords keywords={weapon.keywords} />}
      </CardContent>
    </Card>
  );
}
