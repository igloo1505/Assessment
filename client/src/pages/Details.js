import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Navbar from "../components/Navbar.js";
import { connect } from "react-redux";
import { setFavorite } from "../stateManagement/actions.js";
import { CHANGE_FAVORITE } from "../stateManagement/Types.js";

const Details = ({ props, user, recipes, setFavorite }) => {
  console.log(props);
  const thisRecipe = props.detailViewId;
  const imgSrc = require("../img/stockPhotoForNow.jpg");
  let history = useHistory();
  const [matched_specials, setMatched_specials] = useState([]);

  const [isCurrentFavorite, setIsCurrentFavorite] = useState(false);
  useEffect(() => {
    if (user.user.favorites.indexOf(props.detailViewId._id) !== -1) {
      setIsCurrentFavorite(true);
    } else if (user.user.favorites.indexOf(props.detailViewId._id) == -1) {
      setIsCurrentFavorite(false);
    }
    if (props.detailViewId === "") {
      history.push("/viewAll");
    }
    const matchedSpecials = [];
    let specials = recipes.matchingSpecials;
    let ingredients = props.detailViewId.ingredients;
    if (ingredients) {
      for (let i = 0; i < ingredients.length; i++) {
        let isMatch = specials.filter(
          (s) => s.ingredientId === ingredients[i].uuid
        );
        if (!(typeof isMatch[0] == "undefined")) {
          matchedSpecials.push(isMatch[0]);
        }
      }
      setMatched_specials(matchedSpecials);
    }
  }, [user.user.favorites, CHANGE_FAVORITE]);
  let currentFavs = user.user.favorites;
  const handleFavs = (e) => {
    let id = props.detailViewId._id;
    e.preventDefault();
    e.stopPropagation();
    let method = "add";
    if (currentFavs.indexOf(id) !== -1) {
      method = "subtract";
    }
    setFavorite({ method, id, userId: user.user._id });
  };
  (() => {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  })();

  const checkSpecial = (ingId) => {
    let r = matched_specials.filter((m) => m.ingredientId === ingId);
    if (r.length !== 0) {
      return true;
    } else {
      return false;
    }
  };
  const setToolip = (ing) => {
    let template = "";
    let specials = matched_specials.filter((m) => m.ingredientId === ing.uuid);
    if (specials.length > 0) {
      template += `<div>${specials[0].title}</div><div>${specials[0].text}</div>`;
    }
    return template;
  };

  return (
    <div>
      <Navbar />
      <div className="detailCardWrapper">
        <div className="detailCard">
          <div
            className="signUpCardImg"
            style={{ backgroundImage: `url(${imgSrc})` }}
          ></div>

          <div className="cardFormContainer">
            <h2 className="text-left text-white">{thisRecipe.title}</h2>
            <div className="detailsCardMain">
              <div className="detailsContent">
                <div className="ingredientGrid">
                  <ul className="ingredientUL">
                    {thisRecipe &&
                      thisRecipe.ingredients.map((ing) => (
                        <li className="ingredientLI" key={ing._id}>
                          <span
                            style={
                              checkSpecial(ing.uuid)
                                ? { color: "purple" }
                                : { color: "#fff" }
                            }
                            data-toggle="tooltip"
                            data-placement="top"
                            data-html="true"
                            title={setToolip(ing)}
                          >
                            {ing.amount} {"  "}
                            {ing.measurement && ing.measurement}
                            {"  "}
                            {ing.name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="instructionListContainer">
                  <ul className="instructionList" style={{ listStyle: "none" }}>
                    {thisRecipe &&
                      thisRecipe.directions.map((d) => (
                        <li
                          className="ingredientLI"
                          key={d._id}
                          style={{
                            color: "#fff",
                            textAlign: "left",
                            paddingTop: "1rem",
                          }}
                        >
                          {d.instructions}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary detailCardButton float-right d-inline-block d-md-none"
                onClick={handleFavs}
              >
                {isCurrentFavorite ? "Remove" : "Favorite"}
              </button>
              <button
                type="button"
                className="btn btn-lg btn-outline-primary detailCardButton float-right d-none d-md-inline-block"
                onClick={handleFavs}
              >
                {isCurrentFavorite ? "Remove" : "Favorite"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  recipes: state.recipe,
  props: ownProps,
});

export default connect(mapStateToProps, { setFavorite })(Details);
