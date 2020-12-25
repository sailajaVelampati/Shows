import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/hearder";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Notfound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/details/:id(\d+)">
              <Details />
            </Route>
            <Route path="*">
              <Notfound />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
