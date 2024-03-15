import { Point } from "mafs";

import React, { Fragment } from "react";

function CtrlPointRenderer({ listX, listY }) {
  // render semua ctrl point
  return (
    <Fragment>
      {listX.map((x, index) => (
        <Point x={x} y={listY[index]} key={index} color="Blue" />
      ))}
    </Fragment>
  );
}

export default CtrlPointRenderer;
