import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_NEW_USER,
  USER_ERROR,
} from "./Types.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import setAuthenticated from "./setAuthenticated";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = (user) => async (dispatch) => {
  try {
    let res = await axios.post("/authenticate", user, config);
    dispatch({
      payload: res.data,
      type: LOGIN_USER,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: USER_ERROR,
    });
  }
};
