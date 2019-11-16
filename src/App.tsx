import React, { useEffect, useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";

import customTheme from "./theme";
import AppFrame from "./AppFrame";
import LegionData, { LdfNamePair } from "./model";

import ld from "./legion-data.json";
import ExpansionGrid from "./ExpansionGrid";
import Unit from "./model/unit";
import Upgrade from "./model/upgrade";
import { getViewer } from "./github";

const CLIENT_ID: string = "123a931c6efe1d179e01";
const REDIRECT_URI = "http://localhost:3000";
const legionData: LegionData = ld;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(
    JSON.parse(localStorage.getItem("open") || "true")
  );
  const [unitNames, setUnitNames] = useState({});
  const [upgradeNames, setUpgradeNames] = useState({});
  const [authenticating, setAuthenticating] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [gitHubUser, setGitHubUser] = useState(
    JSON.parse(sessionStorage.getItem("gitHubUser") || "null")
  );

  useEffect(() => {
    localStorage.setItem("open", JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    sessionStorage.setItem("gitHubUser", JSON.stringify(gitHubUser));
  }, [gitHubUser]);

  useEffect(() => {
    // build a map of unit ldf / name pairs
    const uNames: LdfNamePair = {};
    Object.keys(legionData.units).forEach((key: string) => {
      legionData.units[key].forEach((unit: Unit) => {
        uNames[unit.ldf] = unit.name;
      });
    });
    setUnitNames(uNames);

    // build a map of upgrade ldf / name pairs
    const upNames: LdfNamePair = {};
    Object.keys(legionData.upgrades).forEach((key: string) => {
      legionData.upgrades[key].forEach((upgrade: Upgrade) => {
        upNames[upgrade.ldf] = upgrade.name;
      });
    });
    setUpgradeNames(upNames);

    // capture the auth token from github if there is one
    const match = window.location.href.match(/\?code=(.*)/);
    if (match) {
      const code: string = match[1];

      if (code) {
        setAuthenticating(true);
        fetch(`https://swd-gatekeeper.herokuapp.com/authenticate/${code}`)
          .then(response => response.json())
          .then(({ token }) => {
            getViewer(token).then(ghUser => {
              setAuthenticating(false);
              setToken(token);
              setGitHubUser(ghUser);
              setTimeout(
                () => (window.location.href = window.location.origin),
                100
              );
            });
          });
      }
    }
  }, []);

  const handleLoginClick = () => {
    setAuthenticating(true);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`;
  };

  const handleLogoutClick = () => {
    setToken("");
    setGitHubUser(null);
    sessionStorage.removeItem("item");
    sessionStorage.removeItem("gitHubUser");
    window.location.href = window.location.origin;
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppFrame
          authenticated={token !== ""}
          authenticating={authenticating}
          gitHubUser={gitHubUser}
          open={open}
          onDrawerOpen={handleDrawerOpen}
          onDrawerClose={handleDrawerClose}
          onLoginClick={handleLoginClick}
          onLogoutClick={handleLogoutClick}
        />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <ExpansionGrid
              expansions={legionData.sources}
              unitNameMap={unitNames}
              upgradeNameMap={upgradeNames}
            />
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
