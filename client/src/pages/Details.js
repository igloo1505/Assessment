import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar.js";

const Details = (props) => {
  let history = useHistory();
  useEffect(() => {
    if (props.detailViewId === "") {
      history.push("/viewAll");
    }
  }, []);
  console.log(props);
  return (
    <div>
      <Navbar />
      <h1>Details....</h1>
    </div>
  );
};

export default Details;
