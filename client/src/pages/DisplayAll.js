import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar.js";
import RecipeOverviewCard from "../components/RecipeOverviewCard.js";
import { getAllRecipes } from "../stateManagement/actions.js";

const DisplayAll = ({ getAllRecipes, props, recipe: { recipes } }) => {
  useEffect(() => {
    getAllRecipes();
  }, []);
  return (
    <div>
      <Navbar active="viewAll" />
      <h1>Browse Recipes</h1>
      <div className="cardOverviewContainer">
        {recipes.length !== 0 && recipes !== []
          ? recipes.map((r) => (
              <RecipeOverviewCard
                recipe={r}
                key={r._id}
                setDetailViewId={props.setDetailViewId}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  recipe: state.recipe,
  props: ownProps,
});

export default connect(mapStateToProps, { getAllRecipes })(DisplayAll);
