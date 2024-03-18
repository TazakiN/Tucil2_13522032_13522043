import React from "react";
import { Line } from "mafs";

function inPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length - 1; i++) {
    pairs.push([arr[i], arr[i + 1]]);
  }

  return pairs;
}

export function drawLineSegments(pointPath, color, customOpacity) {
  // const points = pointPath.map((point) => useMovablePoint(point));

  return inPairs(pointPath).map(([p1, p2], index) => (
    <Line.Segment
      key={index}
      point1={p1}
      point2={p2}
      opacity={customOpacity}
      color={color}
    />
  ));
}

export function makeCtrlPoints(inputx, inputy, pointNumber) {
  const ctrlPoints = [];
  for (let i = 0; i < pointNumber; i++) {
    ctrlPoints.push([inputx[i], inputy[i]]);
  }
  return ctrlPoints;
}
