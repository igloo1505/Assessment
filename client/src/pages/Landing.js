import React, { useLayoutEffect, useEffect } from "react";
import { useHistory } from "react-router-dom";
import background1 from "../img/background1.jpg";
import background2 from "../img/background2.jpg";
import background3 from "../img/background3.jpg";
import SignInModal from "../components/SignInModal";
import { connect } from "react-redux";

const Landing = ({ user: { isAuthenticated, token } }) => {
  useLayoutEffect(() => {
    const backgroundArray = [background1, background2, background3];
    let random = Math.floor(Math.random() * backgroundArray.length);
    const backgroundUrl = backgroundArray[random];
    document.getElementById(
      "landing"
    ).style.backgroundImage = `url(${backgroundUrl})`;
  });
  let history = useHistory();
  const isLoggedInRedirect = () => {
    history.push("/viewAll");
  };
  const signUpRedirect = () => {
    history.push("/signUp");
  };
  useEffect(() => {
    if (isAuthenticated && token) {
      isLoggedInRedirect();
    }
  }, [isAuthenticated, token]);

  return (
    <div id="landing" className="text-center">
      <SignInModal />
      <div id="darkOverlay" className="cover-container">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4 d-md-block d-lg-none">
              Crescendo Collective
            </h1>
            <h1 className="display-2 d-none d-lg-block">
              Crescendo Collective
            </h1>
            <p className="lead">
              Add your own recipes, or browse what others have created.
            </p>
            <p className="lead d-lg-flex btnContainer">
              <button
                className="btn btn-primary d-block d-lg-none"
                data-toggle="modal"
                data-target="#signInModal"
              >
                Login
              </button>
              <button
                className="btn btn-primary btn-lg d-none d-lg-block"
                data-toggle="modal"
                data-target="#signInModal"
              >
                Login
              </button>
              <button className="btn btn-primary d-block d-lg-none">
                Sign Up
              </button>
              <button
                className="btn btn-primary btn-lg d-none d-lg-inline-block"
                onClick={signUpRedirect}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Landing);
