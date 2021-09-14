import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages

import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";

import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import AddEvent from "./examples/AddEvent";
import Users from "./examples/Users";
import EditUser from "./examples/EditUser";
import Tags from "./examples/Tags";
import AddTag from "./examples/AddTag";
import EditTag from "./examples/EditTag";
import EditEvent from "./examples/EditEvent";
import Tickets from "./examples/Tickets";
import UserService from "../services/user.services";
import EditSettings from "./examples/EditSettings";
import EventsShow from "./examples/EventsShow";
import EventShowDetails from "./examples/EventShowDetails";
import Events from "./examples/Events";
import Dashboard from "./dashboard/Dashboard";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        UserService.isAuthenticated() ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
              <Footer />
            </main>
          </>
        ) : (
          <Redirect to={{ pathname: "/sign-in" }} />
        )
      }
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />

    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.Dashboard.path}
      component={Dashboard}
    />

    <RouteWithSidebar
      exact
      path={Routes.EditSettings.path}
      component={EditSettings}
    />
    <RouteWithSidebar exact path={Routes.AddEvent.path} component={AddEvent} />
    <RouteWithSidebar exact path={Routes.Events.path} component={Events} />
    <RouteWithSidebar
      exact
      path={Routes.EventsShow.path}
      component={EventsShow}
    />
    <RouteWithSidebar
      exact
      path={Routes.EventShowDetails.path}
      component={EventShowDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.EditEvent.path}
      component={EditEvent}
    />
    <RouteWithSidebar exact path={Routes.Tickets.path} component={Tickets} />
    <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
    <RouteWithSidebar exact path={Routes.EditUser.path} component={EditUser} />
    <RouteWithSidebar exact path={Routes.Tags.path} component={Tags} />
    <RouteWithSidebar exact path={Routes.AddTag.path} component={AddTag} />
    <RouteWithSidebar exact path={Routes.EditTag.path} component={EditTag} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
