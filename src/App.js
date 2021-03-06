import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Notfound from "./pages/NotFound";
import fetchData from "./components/API";
import SearchShowsList from "./pages/searchList";
import { fade, makeStyles } from "@material-ui/core/styles";
import HomeStyle from "./pages/HomeStyle";
const useStyles = makeStyles((theme) => HomeStyle(theme, fade));

function App() {
  const classes = useStyles();
  const history = useHistory();
  const [shows, setShows] = useState(null);
  const [searchFieldData, setSearchFieldData] = useState(null);
  const [querySearchList, setQuerySearchList] = useState(null);
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
    return result.reduce(function (showList, show) {
      show.genres.map((item) => {
        showList[item] = showList[item] || [];
        showList[item].push(show);
      });
      return showList;
    }, {});
  };

  const sortByRating = (result) => {
    //sort each gener by rating and modify data in a required format
    const sortedShowsDataSet = [];
    for (const [key, value] of Object.entries(result)) {
      value.sort(function (previousElement, nextElement) {
        return nextElement.rating.average - previousElement.rating.average;
      });
      sortedShowsDataSet.push({ genre: key, entries: value });
    }
    return sortedShowsDataSet;
  };
  const autoCompleteData = (data) => {
    data = data.reduce((showList, show) => {
      showList.push({ title: show.name, id: show.id });
      return showList;
    }, []);
    setSearchFieldData(data);
  };
  const querySearch = (text) => {
    fetchData(`http://api.tvmaze.com/search/shows?q=${text}`, (result) => {
      setQuerySearchList(result);
    });
  };

  useEffect(() => {
    if (querySearchList) {
      history.push("/showList");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySearchList]);
  return (
    <div data-testid="applicationRoot" className={classes.root}>
      <Layout
        history={history}
        searchFieldData={searchFieldData}
        querySearch={querySearch}
      >
        <Switch>
          <Route exact path="/">
            <Home shows={shows} />
          </Route>
          <Route
            path="/details/:id(\d+)"
            render={(props) => (
              <Details key={props.match.params.id} {...props} />
            )}
          ></Route>
          <Route path="/showList">
            <SearchShowsList searchShowsList={querySearchList} />
          </Route>
          <Route path="*">
            <Notfound />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
