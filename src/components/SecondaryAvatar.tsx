import React, { ReactChild } from "react";
import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

interface Props {
  children: number | Number | string | ReactChild | ReactChild[];
}

export default function SecondaryAvatar(props: Props) {
  const classes = useStyles();

  return <Avatar className={classes.avatar}>{props.children}</Avatar>;
}
