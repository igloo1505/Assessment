import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Navbar from "../components/Navbar.js";
import { connect } from "react-redux";
import { setFavorite } from "../stateManagement/actions.js";
import { CHANGE_FAVORITE } from "../stateManagement/Types.js";
import DetailsLI from "../components/DetailsLI.js";

const Details = ({ props, user, recipes, setFavorite }) => {
  console.log(props);
  const thisRecipe = props.detailViewId;
  const imgSrc = require("../img/stockPhotoForNow.jpg");
  let history = useHistory();
  const [matched_specials, setMatched_specials] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
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
    if (!user.isAuthenticated) {
      setShowAlert(true);
    }
    let id = props.detailViewId._id;
    e.preventDefault();
    e.stopPropagation();
    let method = "add";
    if (currentFavs.indexOf(id) !== -1) {
      method = "subtract";
    }
    setFavorite({ method, id, userId: user.user._id });
  };

  const checkSpecial = (ingId) => {
    let r = matched_specials.filter((m) => m.ingredientId === ingId);
    if (r.length !== 0) {
      return r[0];
    } else {
      return false;
    }
  };

  const handleSelectSpecial = (id) => {
    let specials = matched_specials.filter((m) => m.ingredientId === id);
    props.setTheSpecial(specials[0]);
  };

  return (
    <div>
      <Navbar />
      <div
        className={
          showAlert
            ? "alert alert-warning alert-dismissible fade show"
            : "alert alert-warning alert-dismissible fade"
        }
        role="alert"
      >
        <strong style={{ display: "block" }}>Oh no!</strong>
        We're sorry. To favorite a recipe you need to create an account first.
        Click{" "}
        <a
          style={{ fontWeight: 400, TextDecoration: "underline" }}
          onClick={() => history.push("/signUp")}
        >
          <em style={{ textDecoration: "underline", cursor: "pointer" }}>
            here to sign up.
          </em>
        </a>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
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
                        <DetailsLI
                          isSpecial={
                            checkSpecial(ing.uuid) === false ? false : true
                          }
                          theSpecial={
                            checkSpecial(ing.uuid) === false
                              ? null
                              : checkSpecial(ing.uuid)
                          }
                          key={ing._id}
                          handleSelectSpecial={handleSelectSpecial}
                          ingredient={ing}
                          matchedSpecials={matched_specials}
                        />
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
