import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Grid,
  Link,
  ButtonGroup
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import Navigation from "./Navigation";
import { GitHubUser } from "./github";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer is closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  buttonProgress: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  loginWrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));

interface Props {
  authenticated: boolean;
  authenticating: boolean;
  gitHubUser?: GitHubUser;
  open: boolean;
  onDrawerOpen: Function;
  onDrawerClose: Function;
  onLoginClick: Function;
  onLogoutClick: Function;
}

export default function AppFrame(props: Props) {
  const classes = useStyles();
  const {
    authenticated,
    authenticating,
    gitHubUser,
    open,
    onDrawerOpen,
    onDrawerClose,
    onLoginClick,
    onLogoutClick
  } = props;

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => onDrawerOpen()}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Star Wars Legion Data
          </Typography>
          <div className={classes.loginWrapper}>
            {!authenticated && (
              <Button
                color="inherit"
                onClick={() => onLoginClick()}
                disabled={authenticating}
              >
                Login
              </Button>
            )}

            {authenticating && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}

            {authenticated && !authenticating && (
              <ButtonGroup>
                {gitHubUser && (
                  <Button
                    href={`https://github.com/${gitHubUser.login}`}
                    target="_blank"
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>{gitHubUser.name}</Grid>
                      <Grid item>
                        <Avatar src={gitHubUser.avatarUrl} />
                      </Grid>
                    </Grid>
                  </Button>
                )}

                <Button color="inherit" onClick={() => onLogoutClick()}>
                  Sign Out
                </Button>
              </ButtonGroup>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => onDrawerClose()}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        {/* Navigation */}
        <Navigation />

        <Divider />
      </Drawer>
    </React.Fragment>
  );
}
