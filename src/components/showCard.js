import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import HomeStyle from "../pages/HomeStyle";

const useStyles = makeStyles((theme) => HomeStyle(theme, fade));

export default function ShowCard(props) {
  const { data } = props;
  const classes = useStyles();
  return (
    <Card className={classes.rootShowCard}>
      <div className={classes.detailsShowCard}>
        <Grid container spacing={0}>
          <Grid item sm={2}>
            <img
              src={data.image.medium}
              alt={data.name}
              className={classes.showImage}
            />
          </Grid>
          <Grid item sm={10}>
            <CardContent className={classes.contentShowCard}>
              <Typography component="h5" variant="h5" color="textSecondary">
                <b>{data.name}</b>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.rating.average}
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: `${data.summary}`,
                }}
                color="textSecondary"
              ></Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}
