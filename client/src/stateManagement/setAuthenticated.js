import axios from "axios";

const setAuthenticated = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    axios.defaults.headers.common["x-auth-token"] = null;
  }
};

export default setAuthenticated;
