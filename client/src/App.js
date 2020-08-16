import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./stateManagement/store";
import Landing from "./pages/Landing.js";
import DisplayAll from "./pages/DisplayAll";
import MyRecipes from "./pages/MyRecipes";
import Specials from "./pages/Specials";
import MyProfile from "./pages/MyProfile";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./stateManagement/ProtectedRoute";
import {
  setAxiosDefaultsDev,
  setAxiosDefaultsProd,
} from "./constants_utils/defaults.js";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV == "development") {
      setAxiosDefaultsDev();
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    } else {
      setAxiosDefaultsProd();
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Landing />} />
            <Route exact path="/viewAll" component={() => <DisplayAll />} />
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
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
