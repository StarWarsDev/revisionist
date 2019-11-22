import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  anchor: {
    display: "block",
    position: "relative",
    top: -100,
    visibility: "hidden"
  }
});

interface Props {
  id: string;
}

export default function Anchor(props: Props) {
  const classes = useStyles();
  return <div className={classes.anchor} id={props.id} />;
}
