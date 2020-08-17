import { GET_ALL_RECIPES, RECIPE_ERROR, GET_BY_FAVORITES } from "../Types.js";
import setAuthenticated from "../setAuthenticated";
import { useHistory } from "react-router-dom";

const initialState = {
  recipes: [],
  matchingSpecials: [],
  allSpecialsNearby: [],
  userFavorites: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload.docs,
        matchingSpecials: action.payload.specialsArray,
      };
      case GET_BY_FAVORITES: 
      console.log(action.payload)
      return {
        ...state, 
        userFavorites: action.payload
      }
    case RECIPE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
