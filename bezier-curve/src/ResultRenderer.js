import { Line, useMovablePoint } from "mafs";
import { Fragment } from "react";

function ResultRenderer({ data, indek }) {
  let point1 = useMovablePoint([data[0][indek], data[1][indek]]);
  let point2 = useMovablePoint([data[0][indek + 1], data[1][indek + 1]]);
  return (
    <Fragment>
      <Line.Segment point1={point1.point} point2={point2.point} />
      {point1.element}
      {point2.element}
    </Fragment>
  );
}

export default ResultRenderer;
