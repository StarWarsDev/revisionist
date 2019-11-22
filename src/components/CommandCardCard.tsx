import React from "react";
import CommandCard from "../model/command-card";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tooltip,
  Avatar
} from "@material-ui/core";
import Weapon from "./Weapon";
import Anchor from "./Anchor";

interface Props {
  commandCard: CommandCard;
}

export default function CommandCardCard(props: Props) {
  const { commandCard } = props;
  return (
    <React.Fragment>
      <Anchor id={commandCard.ldf} />
      <Card>
        <CardHeader
          avatar={
            <Tooltip
              title={`${commandCard.pips} pip${
                commandCard.pips !== 1 ? "s" : ""
              }`}
            >
              <Avatar>{commandCard.pips}</Avatar>
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
    </React.Fragment>
  );
}
