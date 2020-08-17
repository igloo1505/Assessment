import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_NEW_USER,
  USER_ERROR,
  GET_ALL_RECIPES,
  RECIPE_ERROR,
} from "./Types.js";
import axios from "axios";
import setAuthenticated from "./setAuthenticated";
import { store } from "../stateManagement/store";
import { useStore } from "react-redux";

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

export const registerNewUser = (user) => async (dispatch) => {
  const { name, email, password, city, state, zipCode, street } = user;
  let userConstructedObject = {
    name,
    email,
    password,
    location: { street, city, state, zipCode },
  };
  try {
    const res = await axios.post("/users", userConstructedObject, config);
    dispatch({ type: REGISTER_NEW_USER, payload: res.data });
  } catch (error) {
    dispatch({
      payload: error,
      type: USER_ERROR,
    });
  }
};

export const getAllRecipes = (pageOffset) => async (dispatch) => {
  let page = 0;
  if (pageOffset) {
    page = pageOffset;
  }
  try {
    const res = await axios.get(`/recipes/paginate/${page}`);
    dispatch({ type: GET_ALL_RECIPES, payload: res.data });
  } catch (error) {
    dispatch({ type: RECIPE_ERROR, payload: error });
  }
};
