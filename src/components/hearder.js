import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import HomeStyle from "../pages/HomeStyle";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => HomeStyle(theme, fade));

const Layout = (props) => {
  const classes = useStyles();
  const history = useHistory();
  console.log(props.location);
  return (
    <>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar onClick={() => history.push(`/`)} data-testid="toolBar">
          {props.location.pathname !== "/" ? <ArrowBackIosIcon /> : null}

          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            data-testid="AppTitle"
            style={{ verticalAlign: "center" }}
          >
            SHOWS
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="content">{props.children}</div>
    </>
  );
};

export default withRouter(Layout);
