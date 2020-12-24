import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HomeStyle from "./HomeStyle";
import fetchData from "../components/API";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {
  MultiElementCarousel,
  FullWidthCarousel,
} from "../components/carousel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fullListMock from "../components/API.mock";
const useStyles = makeStyles((theme) => HomeStyle(theme, fade));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [shows, setShows] = useState(null);
  const [searchFieldData, setSearchFieldData] = useState(null);
  useEffect(() => {
    fetchData("http://api.tvmaze.com/shows", pageData);
    // eslint-disable-next-line
  }, []);

  const pageData = (result) => {
    //result = fullListMock;
    autoCompleteData(result);
    result = groupByGener(result);
    setShows(sortByRating(result));
  };
  const groupByGener = (result) => {
    // grouping by genres
    return result.reduce(function (r, a) {
      a.genres.map((item) => {
        r[item] = r[item] || [];
        r[item].push(a);
      });
      return r;
    }, {});
  };

  const sortByRating = (result) => {
    //sort each gener by rating and modify data in a required format
    const sortedShowsDataSet = [];
    for (const [key, value] of Object.entries(result)) {
      value.sort(function (a, b) {
        return b.rating.average - a.rating.average;
      });
      sortedShowsDataSet.push({ genre: key, entries: value });
    }
    return sortedShowsDataSet;
  };
  const autoCompleteData = (data) => {
    data = data.reduce((r, a) => {
      r.push({ title: a.name, id: a.id });
      return r;
    }, []);
    setSearchFieldData(data);
  };
  const navigateTo = (data) => {
    history.push(`/details/${data.id}`);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.SearchBar}>
        <Toolbar>
          <Autocomplete
            style={{ color: "#F8F9F9" }}
            fullWidth={true}
            disableClearable
            options={searchFieldData || []}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => {
              navigateTo(newValue);
            }}
            renderInput={(params) => (
              <TextField
                style={{ color: "#F8F9F9" }}
                {...params}
                label="Search by Shows name"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </Toolbar>
      </AppBar>
      {shows && (
        <div>
          <FullWidthCarousel
            data-testid="fullCarousel"
            type="full"
            autoPlay={true}
            data={shows}
            navigateTo={navigateTo}
            className={classes.FullWidthCarousel}
          />
        </div>
      )}
      {shows &&
        shows.map((item, i) => {
          return (
            <div key={i}>
              <Typography variant="subtitle1">{item.genre} Features</Typography>
              <MultiElementCarousel
                data={item.entries}
                navigateTo={navigateTo}
              />
            </div>
          );
        })}
    </div>
  );
}
