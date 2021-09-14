import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserService from "../services/user.services";

const SecuredRoutes = (props) => {
  return (
    <div>
      <Route
        path={props.path}
        render={(data) =>
          UserService.isAuthenticated() ? (
            <props.component {...data} />
          ) : (
            <Redirect to={{ pathname: "/sign-in" }} />
          )
        }
      ></Route>
    </div>
  );
};

export default SecuredRoutes;
