import React from "react";
import { withRouter } from "react-router-dom";
import { Paper, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import HomeStyle from "./HomeStyle";
import { fade, makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => HomeStyle(theme, fade));
const SearchShowsList = (props) => {
  const { searchShowsList } = props;
  const classes = useStyles();
  window.scrollTo(0, 0);
  return (
    <div>
      {searchShowsList ? (
        <div className={classes.rootDetails}>
          {searchShowsList.map((element, index) => {
            return (
              <div key={index}>
                <Paper className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <img
                        alt={element.name}
                        src={
                          element.show.image ? element.show.image.medium : null
                        }
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <p></p>
                      <Typography variant="h6">{element.show.name}</Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${element.show.summary}`,
                        }}
                      />
                      <Typography variant="caption" display="block">
                        Runtime: {element.show.runtime}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
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

export default withRouter(SearchShowsList);
