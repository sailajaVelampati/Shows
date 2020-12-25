import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import HomeStyle from "./HomeStyle";
import fetchData from "../components/API";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {
  MultiElementCarousel,
  FullWidthCarousel,
} from "../components/carousel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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
    if (result) {
      autoCompleteData(result);
      result = groupByGener(result);
      setShows(sortByRating(result));
    }
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
      {shows ? (
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
      ) : (
        <div className={classes.root}>
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
        </div>
      )}
      {shows
        ? shows.map((item, i) => {
            return (
              <div key={i}>
                <Typography variant="subtitle1">
                  {item.genre} Features
                </Typography>
                <MultiElementCarousel
                  data={item.entries}
                  navigateTo={navigateTo}
                />
              </div>
            );
          })
        : Array.from(new Array(3)).map((i, index) => (
            <Grid key={index} container wrap="nowrap">
              {Array.from(new Array(6)).map((item, index1) => (
                <Box key={index1} width={210} marginRight={0.5} my={5}>
                  <Skeleton variant="rect" width={210} height={118} />
                  <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Box>
              ))}
            </Grid>
          ))}
    </div>
  );
}
