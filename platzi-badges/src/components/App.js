import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Badges from "../pages/Badges";
import BadgeNews from "../pages/BadgeNews";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import BadgeEdit from "../pages/BadgeEdit";
import BadgeDetailsContainer from "../pages/BadgeDetailsContainer";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/badges" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNews} />
          <Route exact path="/badges/:idBadge/edit" component={BadgeEdit} />
          <Route exact path="/badges/:idBadge" component={BadgeDetailsContainer}/>
          <Route exact path="/" component={Home} />
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
