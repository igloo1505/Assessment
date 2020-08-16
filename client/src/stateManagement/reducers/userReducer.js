import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_NEW_USER,
  SET_LOADING,
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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_NEW_USER:
      // let { token, name, email, location } = action.payload;
      // localStorage.setItem("token", token);
      // setAuthenticated(token);
      return {
        // isAuthenticated: true,
        // user: {
        //   name: name,
        //   email: email,
        //   location: location,
        // },
        // loading: false,
      };
    case LOGIN_USER:
      let { token, user } = action.payload;
      localStorage.setItem("token", token);
      // setAuthenticated(token);
      console.log("ran LoginUser");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: user,
      };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
