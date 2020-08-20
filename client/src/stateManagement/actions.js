import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_NEW_USER,
  CHANGE_FAVORITE,
  SUBMIT_NEW_RECIPE,
  USER_ERROR,
  GET_ALL_RECIPES,
  RECIPE_ERROR,
  GET_BY_FAVORITES,
} from "./Types.js";
import axios from "axios";
import setAuthenticated from "./setAuthenticated";
import {
  setAxiosDefaultsDev,
  setAxiosDefaultsProd,
} from "../constants_utils/defaults.js";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = (user) => async (dispatch) => {
  try {
    let res = await axios.post("/authenticate", user, config);
    if (process.env.NODE_ENV == "development") {
      setAxiosDefaultsDev(res.data.token);
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    } else {
      setAxiosDefaultsProd(res.data.token);
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    }
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
    if (process.env.NODE_ENV == "development") {
      setAxiosDefaultsDev(res.data.token);
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    } else {
      setAxiosDefaultsProd(res.data.token);
      console.log(`ran setDefaults as ${process.env.NODE_ENV} `);
    }
    dispatch({ type: REGISTER_NEW_USER, payload: res.data });
  } catch (error) {
    dispatch({
      payload: error,
      type: USER_ERROR,
    });
  }
};

export const setFavorite = (favData) => async (dispatch) => {
  console.log("atAction", favData);
  try {
    const res = await axios.put(`/users/setFavorite`, favData, config);
    dispatch({ type: CHANGE_FAVORITE, payload: res.data });
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

export const getByFavorites = (favoritesArray) => async (dispatch) => {
  try {
    console.log(favoritesArray);
    const res = await axios.post("/recipes/favorites", favoritesArray, config);
    console.log("res", res);
    dispatch({ type: GET_BY_FAVORITES, payload: res.data });
  } catch (error) {
    dispatch({ type: RECIPE_ERROR, payload: error });
  }
};

export const submitNewRecipe = (recipe) => async (dispatch) => {
  console.log(recipe);
  try {
    const res = await axios.post("/recipes/submitNewRecipe", recipe, config);
    dispatch({ type: SUBMIT_NEW_RECIPE, payload: res.data });
  } catch (error) {
    dispatch({ type: RECIPE_ERROR, payload: error });
  }
};
