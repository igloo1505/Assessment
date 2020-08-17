import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import SignUpCard from "../components/SignUpCard";
import { registerNewUser } from "../stateManagement/actions";
const SignUp = ({ registerNewUser }) => {
  const [formStep, setFormStep] = useState(1);
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  let history = useHistory();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    registerNewUser(user);
    setShowAlert(true);
    setTimeout(() => {
      history.push("/viewAll");
    }, 3000);
  };

  return (
    <div className="gradientBackground" style={{ minHeight: "100vh" }}>
      <Navbar active="signUp" />
      <div
        className={
          showAlert
            ? "alert alert-warning alert-dismissible fade show"
            : "alert alert-warning alert-dismissible fade"
        }
        role="alert"
      >
        <strong>Great news!</strong> {user.name}, you're all set. Go ahead and
        add your own recipes, or save what others have added to your favorites.
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <SignUpCard
        handleChange={handleChange}
        formStep={formStep}
        setFormStep={setFormStep}
        user={user}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(null, { registerNewUser })(SignUp);
