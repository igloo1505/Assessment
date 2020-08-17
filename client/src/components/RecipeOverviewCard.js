import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";

const RecipeOverviewCard = ({
  props: { recipe, setDetailViewId },
  recipes,
}) => {
  const [matched_specials, setMatched_specials] = useState([]);
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
  (() => {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  })();
  console.log("specials", matched_specials);
  let tooltipTemplate = "";
  for (let i = 0; i < matched_specials.length; i++) {
    let templateString = `<div>${matched_specials[i].title}</div>`;
    tooltipTemplate += templateString;
  }
  const history = useHistory();
  const redirectToDetailView = () => {
    setDetailViewId(recipe);
    history.push("/details");
  };
  return (
    <div className="overviewCard" onClick={redirectToDetailView}>
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
              data-toggle="tooltip"
              data-placement="top"
              title={tooltipTemplate}
              data-html="true"
            >
              {matched_specials.length} Specials!
            </div>
          )}
        </div>
        <button className="btn btn-primary cardButton">Favorite</button>
        <button className="btn btn-primary cardButton">Details</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  recipes: state.recipe,
  props: ownProps,
});

export default connect(mapStateToProps)(RecipeOverviewCard);
