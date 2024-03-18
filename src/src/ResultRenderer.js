import { Line, useMovablePoint, Text } from "mafs";
import { Fragment } from "react";

function ResultRenderer({ data, index }) {
  let point1 = useMovablePoint([data[index][0], data[index][1]]);
  let point2 = useMovablePoint([data[index + 1][0], data[index + 1][1]]);
  return (
    <Fragment>
      <Text x={point1.x} y={point1.y} attach="w" attachDistance={15}>
        ({point1.x}, {point1.y})
      </Text>
      <Text x={point2.x} y={point2.y} attach="w" attachDistance={15}>
        ({point2.x}, {point2.y})
      </Text>
      <Line.Segment point1={point1.point} point2={point2.point} />
      {point1.element}
      {point2.element}
    </Fragment>
  );
}

export default ResultRenderer;
