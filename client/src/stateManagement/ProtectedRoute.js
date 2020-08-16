import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  user: { loggedIn, loading },
  component: Component,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn && !loading ? (
          <Redirect to="/viewAll" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
