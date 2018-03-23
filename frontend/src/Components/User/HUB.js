import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";


import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import Map from "./Map/Map";

class HUB extends Component {
  render() {
    return (
      <div>
        {/*Navigation Bar Goes HERE*/}
        <nav>
          <Link to="/user/dashboard">USER</Link>{' '}
          <Link to="/user/map">Map</Link>
        </nav>

        {/*Components Goes HERE*/}
        <Switch>
          <Route path="/user/dashboard" component={Dashboard} />
          <Route path="/user/profile" component={Profile} />
          <Route path="/user/map" component={Map}/>
        </Switch>
      </div>
    );
  }
}

export default HUB;
