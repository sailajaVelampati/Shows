import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import HomeStyle from "./HomeStyle";
import fetchData from "../components/API";
import { useHistory } from "react-router-dom";
import {
  MultiElementCarousel,
  FullWidthCarousel,
} from "../components/carousel";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => HomeStyle(theme, fade));

export default function Home(props) {
  const classes = useStyles();
  const history = useHistory();
  const { shows } = props;
  window.scrollTo(0, 0);
  const navigateTo = (data) => {
    console.log(history);
    history.push(`/details/${data.id}`);
  };
  return (
    <div className={classes.root} style={{ marginTop: "10vh" }}>
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
        ? shows.map((show, index) => {
            return (
              <div key={index}>
                <Typography variant="subtitle1">
                  {show.genre} Features
                </Typography>
                <MultiElementCarousel
                  data={show.entries}
                  navigateTo={navigateTo}
                />
              </div>
            );
          })
        : Array.from(new Array(3)).map((item, index) => (
            <Grid key={index} container wrap="nowrap">
              {Array.from(new Array(6)).map((item, innerIndex) => (
                <Box key={innerIndex} width={210} marginRight={0.5} my={5}>
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
