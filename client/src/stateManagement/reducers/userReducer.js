import { LOGIN_USER, LOGOUT_USER, REGISTER_NEW_USER } from "../Types";
import setAuthenticated from "../setAuthenticated";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  loading: false,
  user: {
    name: null,
    email: null,
    location: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_NEW_USER:
      const { token, name, email, location } = action.payload;
      localStorage.setItem("token", token);
      setAuthenticated(token);
      return {
        isAuthenticated: true,
        user: {
          name: name,
          email: email,
          location: location,
        },
        loading: false,
      };

    default:
      return state;
  }
};
