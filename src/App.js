import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HomeStyle from "./pages/HomeStyle";
import fetchData from "./components/API";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Notfound from "./pages/NotFound";

const useStyles = makeStyles((theme) => HomeStyle(theme, fade));
function App() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className="App">
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar onClick={() => history.push(`/`)}>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            data-testid="AppTitle"
          >
            SHOWS
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details/:id" render={(props) => <Details />} />
        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
