import React, { useEffect, useState, useRef, createRef } from "react";
import ToolTip from "./ToolTip.js";

const DetailsLI = (props) => {
  const {
    ingredient,
    isSpecial,
    handleSelectSpecial,
    matchedSpecials,
    theSpecial,
  } = props;
  const [is_special, set_is_special] = useState("");
  console.log(ingredient);
  const getMatchedSpecial = () => {
    console.log("ran get matched specials");
    let x = matchedSpecials.filter((s) => s.ingredientId === ingredient.uuid);
    if (x.length > 0) {
      return x[0].name;
    } else return "";
  };
  console.log("the special ", theSpecial);
  return (
    <div>
      {isSpecial && (
        <ToolTip
          text={isSpecial ? theSpecial.text : ""}
          title={isSpecial ? theSpecial.title : ""}
          specialType={isSpecial ? theSpecial.type : ""}
        />
      )}
      <li
        className="ingredientLI"
        data-toggle="modal"
        data-target={props.isSpecial ? "#specialModal" : ""}
        id={isSpecial ? "specialModalTrigger" : ""}
        data-tip={isSpecial ? theSpecial.text : ""}
      >
        <span
          style={props.isSpecial ? { color: "purple" } : { color: "#fff" }}
          id={ingredient._id}
          onClick={() => {
            if (props.isSpecial) {
              props.handleSelectSpecial(ingredient.uuid);
            }
          }}
        >
          {ingredient.amount} {"  "}
          {ingredient.measurement && ingredient.measurement}
          {"  "}
          {ingredient.name}
        </span>
      </li>
    </div>
  );
};

export default DetailsLI;
