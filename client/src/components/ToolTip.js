import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";

const ToolTip = (props) => {
  console.log("props", props);
  return (
    <Fragment>
      <ReactTooltip place="top" type="dark" html="true" />
    </Fragment>
  );
};

export default ToolTip;
