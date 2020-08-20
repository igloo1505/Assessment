import React, { useState } from "react";
import { submitNewRecipe } from "../stateManagement/actions.js";
import { connect } from "react-redux";

const AddRecipeForm = ({
  submitNewRecipe,
  user: {
    user: { _id },
  },
}) => {
  let [formStep, setFormStep] = useState(1);
  let [tempIngredient, setTempIngredient] = useState("");
  let [tempInstruction, setTempInstruction] = useState("");
  let [recipe, setRecipe] = useState({});
  let [ingredientArray, setIngredientArray] = useState([]);
  let [instructionArray, setInstructionArray] = useState([]);
  let [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const createIngredientArray = (e) => {
    if (e.key == "Enter") {
      setIngredientArray([...ingredientArray, tempIngredient]);
      setTempIngredient("");
    }
  };

  const createInstructionArray = (e) => {
    if (e.key == "Enter") {
      setInstructionArray([...instructionArray, tempInstruction]);
      setTempInstruction("");
    }
  };

  const submitIngredientArray = () => {
    if (tempIngredient.length !== 0) {
      setIngredientArray([...ingredientArray, tempIngredient]);
    }
    setRecipe({
      ...recipe,
      ingredients: ingredientArray,
    });
    console.log(recipe);
    setFormStep(3);
  };
  const handleFinalSubmit = () => {
    console.log(recipe);
    submitNewRecipe(recipe);
  };
  const submitInstructionArray = () => {
    if (tempInstruction.length !== 0) {
      setInstructionArray([...instructionArray, tempInstruction]);
    }
    console.log(instructionArray);
    console.log(_id);
    setRecipe({
      ...recipe,
      directions: instructionArray,
      submittedBy: _id,
    });
    // setFormStep(3);
    console.log("final Submit here", recipe);
    handleFinalSubmit();
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
      {formStep === 1 && (
        <form className="addNewForm">
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Servings"
                style={{ marginTop: "10px" }}
                name="servings"
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Prep Time (mins)"
                name="prepTime"
                style={{ marginTop: "10px" }}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Cook Time (mins)"
                name="cookTime"
                style={{ marginTop: "10px" }}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <textarea
                className="form-control descriptionText"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                style={{ height: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            // onClick={setFormStep(2)}
            onClick={() => setFormStep(2)}
            style={{ marginTop: "40px" }}
          >
            Continue
          </button>
        </form>
      )}
      {formStep === 2 && (
        <form className="addNewForm">
          <div className="row">
            <div className="col-12 col-md-6">
              <div>
                {ingredientArray.map((ing) => (
                  <p key={ing}>{ing}</p>
                ))}
              </div>
              <div>{tempIngredient}</div>
            </div>
            <div className="col-12 col-md-6">
              <textarea
                className="form-control descriptionText"
                placeholder="Ingredients"
                name="ingredients"
                value={tempIngredient}
                onChange={(e) => setTempIngredient(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                    createIngredientArray(e);
                  }
                }}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => submitIngredientArray()}
            style={{ marginTop: "40px" }}
          >
            Continue
          </button>
        </form>
      )}
      {formStep === 3 && (
        <form className="addNewForm">
          <div className="row">
            <div className="col-12 col-md-6">
              <div>
                <h6>Directions:</h6>
                {instructionArray.map((ins) => (
                  <p key={ins}>{ins}</p>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <input
                className="form-control"
                placeholder="Instructions"
                name="directions"
                value={tempInstruction}
                onChange={(e) => setTempInstruction(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                    createInstructionArray(e);
                  }
                }}
              />
              <input
                type="checkbox"
                className="custom-control-input"
                id="isOptional"
                checked={isChecked}
                onChange={(e) => console.log(e.target)}
                onClick={() => setIsChecked(!isChecked)}
              />
              <label
                className="custom-control-label"
                htmlFor="isOptional"
                style={{ marginTop: "15px" }}
              >
                Is this step optional?
              </label>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => submitInstructionArray()}
            style={{ marginTop: "40px" }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { submitNewRecipe })(AddRecipeForm);
