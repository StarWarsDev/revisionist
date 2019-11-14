import React, { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";

import customTheme from "./theme";
import AppFrame from "./AppFrame";
import LegionData from './model'

import ld from "./legion-data.json"
import SourceGrid from "./SourceGrid";

const legionData: LegionData = ld

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
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppFrame
          open={open}
          onDrawerOpen={handleDrawerOpen}
          onDrawerClose={handleDrawerClose}
        />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <SourceGrid data={legionData} />
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
