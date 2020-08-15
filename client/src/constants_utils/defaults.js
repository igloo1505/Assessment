import axios from "axios";
export const setAxiosDefaultsDev = () => {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };
};
