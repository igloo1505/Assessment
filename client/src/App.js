import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./stateManagement/store";
import Landing from "./pages/Landing.js";
import { setAxiosDefaultsDev } from "./constants_utils/defaults.js";

function App() {
  useEffect(() => {
    setAxiosDefaultsDev();
  });

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Test Setup</h1>
        <Landing />
      </div>
    </Provider>
  );
}

export default App;
