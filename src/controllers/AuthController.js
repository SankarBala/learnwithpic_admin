import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthController = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthController;