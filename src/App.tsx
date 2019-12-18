import React, { useEffect, useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
import { Switch, Route, HashRouter } from "react-router-dom";
import { AppFrame, theme } from "./app/index";
import ExpansionGrid from "./pages/ExpansionGrid";
import { getViewer } from "./github";
import CommandCardGrid from "./pages/CommandCardGrid";
import UpgradeGrid from "./pages/UpgradeGrid";
import { UnitGrid } from "./pages/UnitGrid";
import {useStore} from "./data/LegionDataStore";
import {fetchLegionDataForVersion} from "./data";
import LegionData, {LdfNamePair} from "./model";
import Unit from "./model/unit";
import Upgrade from "./model/upgrade";

const CLIENT_ID: string | undefined = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI: string | undefined = process.env.REACT_APP_REDIRECT_URI;
const gatekeeper: string | undefined = process.env.REACT_APP_GATEKEEPER;

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
  const { dispatch } = useStore();
  const classes = useStyles();
  const [open, setOpen] = useState(
    JSON.parse(localStorage.getItem("open") || "true")
  );
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
    // fetch the legionData
    fetchLegionDataForVersion(`${process.env.REACT_APP_LEGION_DATA_VERSION}`)
      .then((legionData: LegionData) => {
        // build a map of unit ldf / name pairs
        const uNames: LdfNamePair = {};
        Object.keys(legionData.units).forEach((key: string) => {
          legionData.units[key].forEach((unit: Unit) => {
            uNames[unit.ldf] = unit.name;
          });
        });

        // build a map of upgrade ldf / name pairs
        const upNames: LdfNamePair = {};
        Object.keys(legionData.upgrades).forEach((key: string) => {
          legionData.upgrades[key].forEach((upgrade: Upgrade) => {
            upNames[upgrade.ldf] = upgrade.name;
          });
        });

        dispatch({ type: "unit-names-changed", unitNames: uNames});
        dispatch({ type: "upgrade-names-changed", upgradeNames: upNames});
        dispatch({ type: "legion-data-changed", data: legionData });
      });
    // capture the auth token from github if there is one
    const match = window.location.href.match(/\?code=(.*)/);
    if (match) {
      const code: string = match[1];

      if (code) {
        setAuthenticating(true);
        fetch(`${gatekeeper}/authenticate/${code}`)
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
  }, [dispatch]);

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
    <HashRouter basename="/">
      <ThemeProvider theme={theme}>
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
              <Switch>
                <Route path="/expansions">
                  <ExpansionGrid />
                </Route>
                <Route path="/units">
                  <UnitGrid />
                </Route>
                <Route path="/upgrades">
                  <UpgradeGrid />
                </Route>
                <Route path="/command-cards">
                  <CommandCardGrid />
                </Route>
              </Switch>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
