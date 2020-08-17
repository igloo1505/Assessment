import { GET_ALL_RECIPES, RECIPE_ERROR } from "../Types.js";
import setAuthenticated from "../setAuthenticated";
import { useHistory } from "react-router-dom";

const initialState = {
  recipes: [],
  matchingSpecials: [],
  allSpecialsNearby: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      console.log(action.payload);
      return {
        ...state,
        recipes: action.payload.docs,
        matchingSpecials: action.payload.specialsArray,
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
