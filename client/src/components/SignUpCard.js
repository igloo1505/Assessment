import React from "react";

const SignUpCard = (props) => {
  let imgSrc = require("../img/SignUpCardPhoto.jpg");
  const validatePasswordMatch = (e) => {
    console.log("validate password match and set UI display here");
  };
  //   FIXME fix zipcode field to only accept numeric input without changing type to avoid conflicts with certain zipcodes

  return (
    <div className="signUpWrapper">
      <div className="signUpCard">
        <div
          className="signUpCardImg"
          style={{ backgroundImage: `url(${imgSrc})` }}
        ></div>
        {props.formStep === 1 && (
          <div className="cardFormContainer">
            <h2 className="text-left text-white">Register</h2>
            <form className="signUpCardForm">
              <div className="form-group">
                <input
                  className="cardInput"
                  type="text"
                  placeholder="Name"
                  name="name"
                  defaultValue={props.user.name}
                  onChange={props.handleChange}
                />
                <input
                  className="cardInput"
                  type="text"
                  placeholder="Email"
                  name="email"
                  defaultValue={props.user.email}
                  onChange={props.handleChange}
                />

                <input
                  className="cardInput cardInputPassword"
                  type="password"
                  placeholder="Password"
                  name="password"
                  defaultValue={props.user.password}
                  onChange={props.handleChange}
                />
                <input
                  className="cardInput cardInputPassword"
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  onChange={(e) => validatePasswordMatch(e)}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary float-right d-block d-md-none"
                onClick={() => props.setFormStep(2)}
              >
                Continue
              </button>
              <button
                type="button"
                className="btn btn-lg btn-primary float-right d-none d-md-block"
                onClick={() => props.setFormStep(2)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {props.formStep === 2 && (
          <div className="cardFormContainer">
            <h2 className="text-left text-white">Location Info</h2>
            <p className="text-left text-white">
              This allows us to show you relevant sales near by.
            </p>
            <form className="signUpCardForm">
              <div className="form-group">
                <input
                  className="cardInput"
                  type="text"
                  placeholder="Street Address"
                  name="street"
                  defaultValue={props.user.street}
                  onChange={props.handleChange}
                />
                <input
                  className="cardInput"
                  type="text"
                  placeholder="City"
                  name="city"
                  defaultValue={props.user.city}
                  onChange={props.handleChange}
                />
                <input
                  className="cardInput"
                  type="text"
                  placeholder="State"
                  name="state"
                  defaultValue={props.user.state}
                  onChange={props.handleChange}
                />
                <input
                  className="cardInput"
                  type="text"
                  inputMode="numeric"
                  placeholder="Zip Code"
                  name="zipCode"
                  defaultValue={props.user.zipCode}
                  onChange={props.handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-success float-right d-block d-md-none"
                onClick={() => props.handleSubmit()}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-lg btn-success float-right d-none d-md-block"
                onClick={() => props.handleSubmit()}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-secondary mr-3 float-right d-block d-md-none"
                onClick={() => props.setFormStep(1)}
              >
                Go Back
              </button>
              <button
                type="button"
                className="btn btn-lg btn-secondary mr-3 float-left d-none d-md-block"
                onClick={() => props.setFormStep(1)}
              >
                Go Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpCard;
