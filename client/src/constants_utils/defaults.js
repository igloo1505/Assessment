import axios from "axios";
export const setAxiosDefaultsDev = () => {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };
};
export const setAxiosDefaultsProd = () => {
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
