import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { setFavorite } from "../stateManagement/actions.js";

const RecipeOverviewCard = ({
  props: { recipe, setDetailViewId, setShowAlert },
  recipes,
  user,
  setFavorite,
}) => {
  const [matched_specials, setMatched_specials] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const matchedSpecials = [];
    let specials = recipes.matchingSpecials;
    let ingredients = recipe.ingredients;
    for (let i = 0; i < ingredients.length; i++) {
      let isMatch = specials.filter(
        (s) => s.ingredientId === ingredients[i].uuid
      );
      if (!(typeof isMatch[0] == "undefined")) {
        matchedSpecials.push(isMatch[0]);
      }
    }
    setMatched_specials(matchedSpecials);
  }, []);

  let currentFavs = user.user.favorites;
  const handleFavs = (e) => {
    if (!user.isAuthenticated || !user.token) {
      setShowAlert();
    }
    let id = recipe._id;
    e.preventDefault();
    e.stopPropagation();
    let method = "add";
    if (currentFavs.indexOf(id) !== -1) {
      method = "subtract";
    }
    setFavorite({ method, id, userId: user.user._id });
  };

  const redirectToDetailView = () => {
    setDetailViewId(recipe);
    history.push("/details");
  };
  return (
    <div className="overviewCard" onClick={(e) => redirectToDetailView(e)}>
      <div className="cardContent">
        <h2 style={{ color: "#fff", fontWeight: 600 }}>{recipe.title}</h2>
        <h5 style={{ color: "#fff", fontWeight: 600 }}>{recipe.description}</h5>
        <div
          style={{
            color: "#ccc",
            fontWeight: 300,
            margin: "6px auto",
          }}
        >
          {recipe.postDate.split(" ")[0]}
        </div>
        <div className="overCardLowerBit">
          <div
            style={{
              color: "#fff",
              fontWeight: 400,
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Prep Time: {recipe.prepTime} min.
          </div>
          <div
            style={{
              color: "#fff",
              fontWeight: 400,
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Cook Time: {recipe.cookTime} min.
          </div>
          <div
            style={{
              color: "#fff",
              fontWeight: 400,
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Servings: {recipe.servings}
          </div>
          {matched_specials.length !== 0 && (
            <div
              style={{
                color: "#ec5e2c",
                fontWeight: 400,
                marginTop: "10px",
                marginBottom: "10px",
              }}
              data-placement="top"
              data-html="true"
            >
              {matched_specials.length} Specials!
            </div>
          )}
        </div>
        <button className="btn btn-primary cardButton" onClick={handleFavs}>
          Favorite
        </button>
        <button className="btn btn-primary cardButton">Details</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  recipes: state.recipe,
  user: state.user,
  props: ownProps,
});

export default connect(mapStateToProps, { setFavorite })(RecipeOverviewCard);
