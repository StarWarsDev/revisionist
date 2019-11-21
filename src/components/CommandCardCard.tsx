import React from "react";
import CommandCard from "../model/command-card";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Tooltip,
  makeStyles
} from "@material-ui/core";
import Weapon from "./Weapon";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

interface Props {
  commandCard: CommandCard;
}

export default function CommandCardCard(props: Props) {
  const classes = useStyles();
  const { commandCard } = props;
  return (
    <Card>
      <CardHeader
        avatar={
          <Tooltip
            title={`${commandCard.pips} pip${
              commandCard.pips !== 1 ? "s" : ""
            }`}
          >
            <Avatar className={classes.avatar}>{commandCard.pips}</Avatar>
          </Tooltip>
        }
        title={commandCard.name}
        subheader={
          <Typography variant="subtitle2">{commandCard.orders}</Typography>
        }
      />
      <CardContent>
        {commandCard.description && <div>{commandCard.description}</div>}
        {commandCard.weapon && <Weapon weapon={commandCard.weapon} />}
      </CardContent>
    </Card>
  );
}
