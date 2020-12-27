import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Paper, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "linear-gradient(to right bottom, #7BA6CE, #545F69)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    padding: "0px 20px",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function ShowCard(props) {
  const { data } = props;
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <Grid container spacing={0}>
          <Grid item sm={2}>
            <img
              src={data.image.medium}
              style={{
                display: "block",
                height: "100%",
                weight: "100%",
              }}
              alt={data.name}
            />
          </Grid>
          <Grid item sm={10}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {data.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.rating.average}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                dangerouslySetInnerHTML={{
                  __html: `${data.summary}`,
                }}
              ></Typography>
            </CardContent>
          </Grid>
        </Grid>
        {/* <CardMedia
          className={classes.cover}
          src="http://static.tvmaze.com/uploads/images/medium_portrait/59/148162.jpg"
          title="Live from space album cover"
        /> */}
      </div>
    </Card>
  );
}
