import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../components/API";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import HomeStyle from "./HomeStyle";
import { fade, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => HomeStyle(theme, fade));
const Details = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [showDetails, setShowdetails] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(`http://api.tvmaze.com/shows/${id}?embed=episodes`, (result) => {
      setShowdetails(result);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {showDetails ? (
        <div className={classes.rootDetails}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <img src={showDetails.image.medium} alt={showDetails.name} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" noWrap>
                {showDetails.name}
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${showDetails.summary}`,
                }}
              />
              <Typography variant="body2">
                Genres: {showDetails.genres.join(",")}
              </Typography>
              <Typography variant="body2">
                Rating: {showDetails.rating.average}
              </Typography>
            </Grid>
            {}
          </Grid>
          <Divider />

          <Typography variant="h6">Episodes</Typography>

          {showDetails._embedded.episodes.map((episode, index) => {
            return (
              <div key={index}>
                <Grid container>
                  <Grid item xs={4}>
                    <img
                      src={episode.image ? episode.image.medium : null}
                      alt={episode.name}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <p></p>
                    <Typography variant="h6">{episode.name}</Typography>
                    <Typography variant="caption" display="block">
                      {`Season: ${episode.season} Episode: ${episode.number}`}
                    </Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${episode.summary}`,
                      }}
                    />
                    <Typography variant="caption" display="block">
                      Runtime: {episode.runtime}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="rect" height={550} />
        </div>
      )}
    </div>
  );
};

export default Details;
