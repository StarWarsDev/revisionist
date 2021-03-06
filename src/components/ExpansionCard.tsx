import React from "react";
import Expansion from "../model/expansion";
import {
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  Tooltip,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import { capitalize } from "../util";

interface Props {
  data: Expansion;
  lookupUnitName: Function;
  lookupUpgradeName: Function;
}

const useStyles = makeStyles(theme => ({
  avatarUnreleased: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
}));

export default function ExpansionCard(props: Props) {
  const { data, lookupUnitName, lookupUpgradeName } = props;
  const classes = useStyles();
  let tooltipText = `released in wave ${data.wave}`;
  if (!data.released) {
    tooltipText = `to be ${tooltipText}`;
  }

  return (
    <Card id={data.ldf}>
      <CardHeader
        avatar={
          <Tooltip title={capitalize(tooltipText)}>
            <Avatar className={!data.released ? classes.avatarUnreleased : ""}>
              {data.wave}
            </Avatar>
          </Tooltip>
        }
        title={data.name}
      />

      <CardContent>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            {/* Units */}
            <Typography component="p" variant="subtitle2" color="textPrimary">
              Units
            </Typography>
            {data.contents.units &&
              Object.keys(data.contents.units).map((key: string) => (
                <Typography
                  key={`${data.ldf}-${key}`}
                  component="p"
                  variant="body2"
                  color="textSecondary"
                >
                  {lookupUnitName(key)}:{" "}
                  {data.contents.units && data.contents.units[key]}
                </Typography>
              ))}
          </Grid>

          <Grid item xs={6}>
            {/* Upgrades */}
            <Typography component="p" variant="subtitle2" color="textPrimary">
              Upgrades
            </Typography>
            {data.contents.upgrades &&
              Object.keys(data.contents.upgrades).map((key: string) => (
                <Typography
                  key={`${data.ldf}-${key}`}
                  component="p"
                  variant="body2"
                  color="textSecondary"
                >
                  {lookupUpgradeName(key)}:{" "}
                  {data.contents.upgrades && data.contents.upgrades[key]}
                </Typography>
              ))}
          </Grid>
        </Grid>
      </CardContent>

      {/* Units */}
      {/* <div>
        
      </div> */}

      {/* Upgrades */}
      {/* <div>
        {data.contents.upgrades && Object.keys(data.contents.upgrades).map((key: string) => (
        <div>{key}: {data.contents.upgrades && data.contents.upgrades[key]}</div>
        ))}
      </div> */}
    </Card>
  );
}
