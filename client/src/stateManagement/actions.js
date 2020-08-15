import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_NEW_USER,
  USER_ERROR,
} from "./Types.js";
import axios from "axios";
import setAuthenticated from "./setAuthenticated";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = (user) => async (dispatch) => {
  console.log(user);
  try {
    const res = await axios.post("/authenticate", user, config);
    console.log(res);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      payload: error.msg,
      type: USER_ERROR,
    });
  }
};
