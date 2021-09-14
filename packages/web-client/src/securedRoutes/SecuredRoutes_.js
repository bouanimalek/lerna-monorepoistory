import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserService from "../services/user.services";

const SecuredRoutes_ = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          UserService.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/sign-in" }} />
          )
        }
      ></Route>
    </div>
  );
};

export default SecuredRoutes_;
