import React from "react";
import { Typography, Divider } from "@material-ui/core";

interface Props {
  title: string;
}

export default function PageHeader(props: Props) {
  return (
    <React.Fragment>
      <Typography component="h3" variant="h3">
        {props.title}
      </Typography>
      <br />
      <Divider />
      <br />
    </React.Fragment>
  );
}
