import { Line, useMovablePoint } from "mafs";
import { Fragment } from "react";

function ResultRenderer({ data, index }) {
  let point1 = useMovablePoint([data[index][0], data[index][1]]);
  let point2 = useMovablePoint([data[index + 1][0], data[index + 1][1]]);
  return (
    <Fragment>
      <Line.Segment point1={point1.point} point2={point2.point} />
      {point1.element}
      {point2.element}
    </Fragment>
  );
}

export default ResultRenderer;
