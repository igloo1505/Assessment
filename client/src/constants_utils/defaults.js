import axios from "axios";
export const setAxiosDefaultsDev = (token) => {
  console.log(token);
  axios.defaults.baseURL = "http://localhost:3001";

  if (token) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
  } else {
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
  }
};
export const setAxiosDefaultsProd = (token) => {
  console.log(token);
  if (token) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
  } else {
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
  }
};

export const styleObject = {
  crescendoAccentColor: "#ec5e2c",
  displayName: {
    short: "Crescendo Collective",
    longer: "Crescendo Collective Recipes",
  },
};
