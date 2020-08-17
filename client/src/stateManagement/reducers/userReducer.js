import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_NEW_USER,
  SET_LOADING,
  USER_ERROR,
} from "../Types";
import setAuthenticated from "../setAuthenticated";
import { useHistory } from "react-router-dom";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  loading: false,
  user: {
    favorites: [],
    name: null,
    email: null,
    location: {
      street: null,
      city: null,
      state: null,
      zipCode: null,
      geo: { lat: null, lng: null },
    },
  },
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_NEW_USER:
      let { name, email, favorites, location } = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      return {
        isAuthenticated: true,
        token: action.payload.token,
        user: {
          name: name,
          email: email,
          favorites: favorites,
          location: location,
        },
        loading: false,
      };
    case LOGIN_USER:
      let { token, user } = action.payload;
      localStorage.setItem("token", token);
      console.log(action.payload);
      return {
        ...state,
        token: token,
        isAuthenticated: true,
        loading: false,
        user: user,
      };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case USER_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
