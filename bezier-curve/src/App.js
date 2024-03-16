import React, { useState } from "react";
import "./App.css";
import { Mafs, Coordinates } from "mafs";
import BesierLogic from "./BesierLogic.js";
import ResultRenderer from "./ResultRenderer.js";
import BezierBF from "./BezierBF.js";
import {
  drawLineSegments,
  makeCtrlPoints,
} from "./components/CtrlPointRenderer.js";
import { drawPoints } from "./components/drawPoints.js";

function App() {
  const [pointNumber, setPointNumber] = useState(3);
  const [iterNumber, setIterNumber] = useState(1);
  const [inputx, setInputx] = useState([]);
  const [inputy, setInputy] = useState([]);
  const [result, setResult] = useState([]);
  const [daMafs, setMafs] = useState(null);

  let inputedPoints = makeCtrlPoints(inputx, inputy, pointNumber);

  const handleInputChangex = (index, value) => {
    const newInputs = [...inputx];
    newInputs[index] = value;
    setInputx(newInputs);
  };

  const handleInputChangey = (index, value) => {
    const newInputs = [...inputy];
    newInputs[index] = value;
    setInputy(newInputs);
  };

  const handleBesierLogic = () => {
    const newresult = BesierLogic(pointNumber, iterNumber, inputx, inputy);
    console.log(newresult);
    // console.log(daMafs);
    setResult(newresult);

    // BFFFFFFFFFFFFFF

    // let newP = [];
    // for (let i = 0; i < inputx.length; i++) {
    //   newP.push([inputx[i], inputy[i]]);
    // }
    // console.log("HOHOHO");
    // console.log(BezierBF(iterNumber, newP));

    // BFFFFFFFFFFFFFF

    let maxx = newresult[0][0];
    let minx = newresult[0][0];
    let maxy = newresult[0][1];
    let miny = newresult[0][1];
    for (let i = 0; i < newresult.length; i++) {
      if (newresult[i][0] >= maxx) {
        maxx = newresult[i][0];
      }
      if (newresult[i][0] <= minx) {
        minx = newresult[i][0];
      }
      if (newresult[i][1] >= maxy) {
        maxy = newresult[i][1];
      }
      if (newresult[i][1] <= miny) {
        miny = newresult[i][1];
      }
    }
    setMafs(
      <Mafs
        viewBox={{ x: [minx - 5, maxx + 5], y: [miny - 5, maxy + 5] }}
        // x: [Math.min(result[0]), Math.max(result[0])],
        //   y: [Math.min(result[1]), Math.max(result[1])],
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian />

        {/* buat ctrl point dan garisnya */}

        {inputedPoints.slice(0, inputedPoints.length - 1).map((_, idx) => (
          <ResultRenderer key={idx} data={inputedPoints} index={idx} />
        ))}

        {drawLineSegments(newresult, "#AA19C7", 1)}
        {drawPoints(newresult, "#AA19C7", 1)}

        {result.length > 0 && <ResultRenderer data={result} />}
      </Mafs>
    );
  };

  return (
    <>
      <div className="container">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Stardos+Stencil:wght@400;700&family=Tauri&display=swap"
          rel="stylesheet"
        ></link>
        <h1>Beziers Curve</h1>
        <br />
        <div className="input-group">
          <label htmlFor="titleInput" className="label">
            Iteration:
          </label>
          <input
            className="input"
            type="number"
            placeholder="Number"
            value={iterNumber}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (isNaN(newValue)) {
                setIterNumber(0);
              } else {
                setIterNumber(newValue);
              }
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="titleInput" className="label">
            N Points:
          </label>
          <input
            className="input"
            type="number"
            placeholder="Number"
            value={pointNumber}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (isNaN(newValue)) {
                setPointNumber(0);
              } else {
                setPointNumber(newValue);
              }
            }}
          />
        </div>
        <br />
        {[...Array(pointNumber)].map((_, index) => (
          <div className="inputRow" key={index}>
            <div className="input-group">
              <label className="label">Point {index + 1}</label>
              <input
                className="input"
                type="number"
                placeholder={`x${index + 1}`}
                value={inputx[index]}
                onChange={(e) =>
                  handleInputChangex(index, parseInt(e.target.value), 0)
                }
              />
              <input
                className="input"
                type="number"
                placeholder={`y${index + 1}`}
                value={inputy[index] ? inputy[index] : ""}
                onChange={(e) =>
                  handleInputChangey(index, parseInt(e.target.value), 1)
                }
              />
            </div>
            <br />
          </div>
        ))}

        <button className="addButton" onClick={handleBesierLogic}>
          Process Bezier Curve
        </button>
      </div>
      <div className="container" hidden={result.length === 0}>
        {daMafs}
      </div>
    </>
  );
}

export default App;
