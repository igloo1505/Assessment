import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.js";
import { connect } from "react-redux";
import { getByFavorites } from "../stateManagement/actions.js";
import AddRecipeForm from "../components/AddRecipeForm.js";
import ViewFavorites from "../components/ViewFavorites.js";
import ViewMyRecipes from "../components/ViewMyRecipes.js";
const MyRecipes = ({ user, recipe, getByFavorites }) => {
  useEffect(() => {
    getByFavorites(user.user.favorites);
  }, []);
  const [activeTab, setActiveTab] = useState("MyRecipes");

  return (
    <div>
      <Navbar active="myRecipes" />
      <div className="myRecipeContainer">
        <ul class="nav nav-pills mb-3 tabNavBar" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-home"
              aria-selected={activeTab === "MyRecipes" ? true : false}
              onClick={() => setActiveTab("MyRecipes")}
            >
              My Recipes
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-profile-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-profile"
              aria-selected={activeTab === "MyFavorites" ? true : false}
              onClick={() => setActiveTab("MyFavorites")}
            >
              My Favorites
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-contact-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-contact"
              aria-selected={activeTab === "AddNew" ? true : false}
              onClick={() => setActiveTab("AddNew")}
            >
              Add New Recipe
            </a>
          </li>
        </ul>
        {activeTab === "MyRecipes" && <ViewMyRecipes />}
        {activeTab === "MyFavorites" && <ViewFavorites />}
        {activeTab === "AddNew" && <AddRecipeForm />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  recipe: state.recipe,
});

export default connect(mapStateToProps, { getByFavorites })(MyRecipes);
