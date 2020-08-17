import React, { useEffect } from "react";
import Navbar from "../components/Navbar.js";
import { connect } from "react-redux";
import { getByFavorites } from "../stateManagement/actions.js";
const MyRecipes = ({ user, recipe, getByFavorites }) => {
  useEffect(() => {
    getByFavorites(user.user.favorites);
  }, []);
  return (
    <div>
      <Navbar active="myRecipes" />
      <h1>My Recipes Goes here</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  recipe: state.recipe,
});

export default connect(mapStateToProps, { getByFavorites })(MyRecipes);
