import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import HomeStyle from "../pages/HomeStyle";
import { withRouter } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import EventSeatIcon from "@material-ui/icons/EventSeat";

const useStyles = makeStyles((theme) => HomeStyle(theme, fade));

const Layout = (props) => {
  const classes = useStyles();

  const { searchFieldData, querySearch, history } = props;
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
      console.log("onchange called", value);
      history.push(`/details/${value.id}`);
    },
    clearOnBlur: true,
    onClose: (event, reason) => {
      console.log("onClose called", reason);
      if (reason === "blur") {
        querySearch(event.target.value);
      }
    },
  });
  return (
    <>
      <AppBar
        data-testid="layoutApplicationBar"
        className={classes.AppBar}
        position="fixed"
      >
        <Toolbar data-testid="toolBar">
          {props.location.pathname !== "/" ? <ArrowBackIosIcon /> : null}
          <Typography
            onClick={() => history.push(`/`)}
            className={classes.title}
            variant="h6"
            noWrap
            data-testid="AppTitle"
          >
            TV <EventSeatIcon style={{ color: "red" }} /> BUZZ
          </Typography>
          <div className={classes.search} {...getRootProps()}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              data-testid="searchInput"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              {...getInputProps()}
            />
            {groupedOptions.length > 0 ? (
              <ul
                className={classes.listbox}
                {...getListboxProps()}
                data-testid="searchInputList"
              >
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
