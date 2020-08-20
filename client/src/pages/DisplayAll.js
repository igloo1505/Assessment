import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar.js";
import RecipeOverviewCard from "../components/RecipeOverviewCard.js";
import { getAllRecipes } from "../stateManagement/actions.js";
import { useHistory } from "react-router-dom";

const DisplayAll = ({ getAllRecipes, props, recipe: { recipes } }) => {
  useEffect(() => {
    getAllRecipes();
  }, []);
  const [showAlert, setAlert] = useState(false);
  const setShowAlert = () => setAlert(true);
  let history = useHistory();
  return (
    <div>
      <Navbar active="viewAll" />
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
      <h1>Browse Recipes</h1>
      <div className="cardOverviewContainer">
        {recipes.length !== 0 && recipes !== []
          ? recipes.map((r) => (
              <RecipeOverviewCard
                recipe={r}
                key={r._id}
                setDetailViewId={props.setDetailViewId}
                setShowAlert={setShowAlert}
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
