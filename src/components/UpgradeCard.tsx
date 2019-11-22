import React, { ReactChild } from "react";
import Upgrade from "../model/upgrade";
import {
  Card,
  CardHeader,
  Avatar,
  Tooltip,
  CardContent,
  Divider
} from "@material-ui/core";
import Anchor from "./Anchor";
import { Keyword } from "../model";
import Weapon from "./Weapon";
import { joinKeywords } from "../util";

function SegmentDivider() {
  return (
    <React.Fragment>
      <br />
      <Divider />
      <br />
    </React.Fragment>
  );
}

interface SegmentProps {
  children: ReactChild | ReactChild[];
}

function Segment(props: SegmentProps) {
  return (
    <React.Fragment>
      <SegmentDivider />
      <div>{props.children}</div>
    </React.Fragment>
  );
}

interface Props {
  upgrade: Upgrade;
}

export default function UpgradeCard(props: Props) {
  const { upgrade } = props;
  return (
    <Card>
      <Anchor id={upgrade.ldf} />
      <CardHeader
        title={upgrade.name}
        avatar={
          <Tooltip title={`${upgrade.points} points`}>
            <Avatar>{upgrade.points}</Avatar>
          </Tooltip>
        }
      />
      <CardContent>
        {upgrade.restrictions && (
          <Segment>Restrictions: {upgrade.restrictions.name}</Segment>
        )}
        {upgrade.exhaust === true && <Segment>Exhaustable</Segment>}
        {upgrade.keywords && (
          <Segment>Keywords: {joinKeywords(upgrade.keywords)}</Segment>
        )}
        {upgrade.description && (
          <Segment>Description: {upgrade.description}</Segment>
        )}
        {upgrade.weapon && (
          <Segment>
            <Weapon weapon={upgrade.weapon} />
          </Segment>
        )}
      </CardContent>
    </Card>
  );
}
