import { Point } from "mafs";
import React from "react";

export function drawPoints(points, color, opacity = 1) {
  return points.map((point, index) => (
    <Point
      key={index}
      x={point[0]}
      y={point[1]}
      color={color}
      opacity={opacity}
    />
  ));
}
