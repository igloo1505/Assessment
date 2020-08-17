import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import SignInModal from "./SignInModal";

const Navbar = ({ active, user: { isAuthenticated, token } }) => {
  let history = useHistory();
  const setRedirect = (route) => {
    history.push(route);
  };
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    setActiveTab(active);
  }, [active]);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (isAuthenticated && token) {
      setAuthenticated(true);
    }
  });

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light">
        <a className="navbar-brand brandOnLarge ">Crescendo Collective</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 navbarUL">
            <li
              className={
                activeTab === "viewAll" ? "nav-item" : "nav-item active"
              }
            >
              <a className="nav-link" onClick={() => setRedirect("/viewAll")}>
                Home{" "}
              </a>
            </li>
            {authenticated && (
              <li
                className={
                  activeTab === "myRecipes" ? "nav-item" : "nav-item active"
                }
              >
                <a
                  className="nav-link"
                  onClick={() => setRedirect("/myRecipes")}
                >
                  My Recipes
                </a>
              </li>
            )}
            <li
              className={
                activeTab === "specials" ? "nav-item" : "nav-item active"
              }
            >
              <a className="nav-link" onClick={() => setRedirect("/specials")}>
                Specials
              </a>
            </li>
            {authenticated && (
              <li
                className={
                  activeTab === "myProfile" ? "nav-item" : "nav-item active"
                }
              >
                <a
                  className="nav-link"
                  onClick={() => setRedirect("/myProfile")}
                >
                  My Profile
                </a>
              </li>
            )}
            {!authenticated && (
              <li className="nav-item active">
                <a
                  className="nav-link"
                  data-toggle="modal"
                  data-target="#signInModal"
                >
                  Login
                </a>
              </li>
            )}
            {!authenticated && (
              <li
                className={
                  activeTab === "signUp" ? "nav-item" : "nav-item active"
                }
              >
                <a className="nav-link" onClick={() => setRedirect("/signUp")}>
                  Sign Up
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  props: ownProps,
});

export default connect(mapStateToProps)(Navbar);
