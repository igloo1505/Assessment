import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./stateManagement/store";
import Landing from "./pages/Landing.js";
import DisplayAll from "./pages/DisplayAll";
import MyRecipes from "./pages/MyRecipes";
import Specials from "./pages/Specials";
import MyProfile from "./pages/MyProfile";
import Details from "./pages/Details";
import SignUp from "./pages/SignUp";
import SignInModal from "./components/SignInModal";
import ProtectedRoute from "./stateManagement/ProtectedRoute";
import {
  setAxiosDefaultsDev,
  setAxiosDefaultsProd,
} from "./constants_utils/defaults.js";

function App() {
  useEffect(() => {
    let token;
    if (localStorage.token) {
      token = localStorage.token;
    } else {
      token = null;
    }
    if (process.env.NODE_ENV == "development") {
      setAxiosDefaultsDev(token);
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    } else {
      setAxiosDefaultsProd(token);
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    }
  }, []);
  const [detailViewId, setDetailViewId] = useState("");

  return (
    <Provider store={store}>
      <div className="App">
        <SignInModal />
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Landing />} />
            <Route
              exact
              path="/viewAll"
              component={() => <DisplayAll setDetailViewId={setDetailViewId} />}
            />
            <ProtectedRoute
              exact
              path="/myRecipes"
              component={() => <MyRecipes />}
            />
            <Route exact path="/specials" component={() => <Specials />} />
            <ProtectedRoute
              exact
              path="/myProfile"
              component={() => <MyProfile />}
            />
            <Route exact path="/signUp" component={() => <SignUp />} />
            <Route
              exact
              path="/details"
              component={() => <Details detailViewId={detailViewId} />}
            />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
