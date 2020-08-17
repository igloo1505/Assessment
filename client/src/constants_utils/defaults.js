import axios from "axios";
export const setAxiosDefaultsDev = (token) => {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.headers["x-auth-token"] = token;
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };
};
export const setAxiosDefaultsProd = (token) => {
  axios.defaults.headers["x-auth-token"] = token;
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };
};

export const styleObject = {
  crescendoAccentColor: "#ec5e2c",
  displayName: {
    short: "Crescendo Collective",
    longer: "Crescendo Collective Recipes",
  },
};
