import React from "react";
import UnitModel from "../model/unit";
import { Card, CardHeader, Tooltip, Avatar } from "@material-ui/core";

interface Props {
  unit: UnitModel;
}

export default function Unit(props: Props) {
  const { unit } = props;

  return (
    <Card>
      <CardHeader
        title={unit.name}
        avatar={
          <Tooltip title={`${unit.points} points`}>
            <Avatar>{unit.points}</Avatar>
          </Tooltip>
        }
      />
    </Card>
  );
}
