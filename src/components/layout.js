import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import HomeStyle from "../pages/HomeStyle";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import useAutocomplete from "@material-ui/lab/useAutocomplete";

const useStyles = makeStyles((theme) => HomeStyle(theme, fade));

const Layout = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { searchFieldData, querySearch, navigateTo } = props;
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "global-search",
    options: searchFieldData,
    getOptionLabel: (option) => option.title,
    onChange: (event, value) => {
      console.log(value.id, history);
      history.push(`/details/1`);
      navigateTo(value.id);
    },
    clearOnBlur: false,
    onClose: (event, reason) => {
      if (reason === "blur") {
        querySearch(event.target.value);
      }
    },
  });
  return (
    <>
      <AppBar className={classes.AppBar} position="fixed">
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
          <div className={classes.search} {...getRootProps()}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              {...getInputProps()}
            />
            {groupedOptions.length > 0 ? (
              <ul className={classes.listbox} {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <li {...getOptionProps({ option, index })}>{option.title}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      <div className="content">{props.children}</div>
    </>
  );
};
export default withRouter(Layout);
