import React, { useState, useEffect } from "react";
import "./App.css";
import { Mafs, Coordinates, Line, Text } from "mafs";
import ResultRenderer from "./ResultRenderer.js";
import BezierBF from "./BezierBF.js";
import BezierLogicv2 from "./BezierLogicv2.js";
import BezierProcess from "./BezierProcess.js";
import {
  drawLineSegments,
  makeCtrlPoints,
} from "./components/CtrlPointRenderer.js";
import { drawPoints } from "./components/drawPoints.js";
import { Switch } from "antd";

const colors = ["Yellow", "Red", "Blue"];

function App() {
  const [pointNumber, setPointNumber] = useState(3);
  const [iterNumber, setIterNumber] = useState(1);
  const [inputx, setInputx] = useState([]);
  const [inputy, setInputy] = useState([]);
  const [result, setResult] = useState([]);
  const [daMafs, setMafs] = useState(null);
  const [daTime, setTime] = useState(null);
  const [counter, setCounter] = useState(1);
  const [isitdnc, setLogic] = useState(true);
  const [isshow, setshow] = useState(false);
  const [daPoints, setPoints] = useState(null);
  const [isDots, setDots] = useState(true);
  const [isProc, setProc] = useState(false);
  const [daProc, setProccc] = useState(null);

  let inputedPoints = makeCtrlPoints(inputx, inputy, pointNumber);

  const handleProc = () => {
    isProc ? setProc(false) : setProc(true);
  };

  const handleDots = () => {
    isDots ? setDots(false) : setDots(true);
  };
  const handleShowToggle = () => {
    isshow ? setshow(false) : setshow(true);
  };

  const handleLogicToggle = () => {
    isitdnc ? setLogic(false) : setLogic(true);
  };

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
    let newresult = [];
    let proc = [];
    let startTime,
      endTime = 0;
    if (isitdnc) {
      startTime = performance.now();
      newresult = BezierLogicv2(iterNumber, inputx, inputy); // DNCv2
      endTime = performance.now();
    } else {
      startTime = performance.now();
      newresult = BezierBF(iterNumber, inputx, inputy); //BF
      endTime = performance.now();
    }
    console.log(endTime - startTime);
    console.log(newresult);

    proc = BezierProcess(iterNumber, inputx, inputy);
    console.log(proc);

    // console.log("HERE");
    setResult(newresult);

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
    if (isDots) {
      setMafs(
        <Mafs
          viewBox={{ x: [minx - 2, maxx + 2], y: [miny - 2, maxy + 2] }}
          // x: [Math.min(result[0]), Math.max(result[0])],
          //   y: [Math.min(result[1]), Math.max(result[1])],
          // preserveAspectRatio={true}
          zoom={true}
        >
          <Coordinates.Cartesian
            xAxis={{ labels: false }}
            yAxis={{ labels: false }}
          />

          {/* buat ctrl point dan garisnya */}

          {inputedPoints.slice(0, inputedPoints.length - 1).map((item, idx) => (
            <ResultRenderer
              key={idx + counter * 1000}
              data={inputedPoints}
              index={idx}
            />
          ))}

          {newresult.slice(0, newresult.length - 1).map((item, idx) => (
            <Line.Segment
              key={idx + counter * 1000}
              point1={newresult[idx]}
              point2={newresult[idx + 1]}
              opacity={1}
              color={"#AA19C7"}
            />
          ))}

          {/* {drawLineSegments(newresult, "#AA19C7", 1)} */}
          {drawPoints(newresult, "#AA19C7", 1)}

          {/* {result.length > 0 && <ResultRenderer data={result} />} */}
        </Mafs>
      );
    } else {
      setMafs(
        <Mafs
          viewBox={{ x: [minx - 2, maxx + 2], y: [miny - 2, maxy + 2] }}
          zoom={true}
        >
          <Coordinates.Cartesian
            xAxis={{ labels: false }}
            yAxis={{ labels: false }}
          />

          {inputedPoints.slice(0, inputedPoints.length - 1).map((item, idx) => (
            <ResultRenderer
              key={idx + counter * 1000}
              data={inputedPoints}
              index={idx}
            />
          ))}

          {newresult.slice(0, newresult.length - 1).map((item, idx) => (
            <Line.Segment
              key={idx + counter * 1000}
              point1={newresult[idx]}
              point2={newresult[idx + 1]}
              opacity={1}
              color={"#AA19C7"}
            />
          ))}
        </Mafs>
      );
    }
    setCounter(counter + 1);
    setTime(
      <div className="input-group">
        <label className="label-2">
          Time Elapsed = {endTime - startTime} miliseconds
        </label>
      </div>
    );

    if (isshow) {
      setPoints(
        <div className="input-group-2">
          <label className="label-3">
            {newresult.length} Points Generated
            <br />
          </label>
          {newresult.map((_, index) => (
            <label className="label-2">
              Point {index + 1}: {" " + newresult[index][0] + ","}{" "}
              {newresult[index][1]}
              <br />
            </label>
          ))}
        </div>
      );
    } else {
      setPoints(null);
    }

    if (isProc) {
      setProccc(
        <Mafs
          viewBox={{ x: [minx - 2, maxx + 2], y: [miny - 2, maxy + 2] }}
          zoom={true}
        >
          <Coordinates.Cartesian
            xAxis={{ labels: false }}
            yAxis={{ labels: false }}
          />

          {inputedPoints.slice(0, inputedPoints.length - 1).map((item, idx) => (
            <ResultRenderer
              key={idx + counter * 1000}
              data={inputedPoints}
              index={idx}
            />
          ))}

          {newresult.slice(0, newresult.length - 1).map((item, idx) => (
            <Line.Segment
              key={idx + counter * 1000}
              point1={newresult[idx]}
              point2={newresult[idx + 1]}
              opacity={1}
              color={"#AA19C7"}
            />
          ))}

          {drawPoints(newresult, "#AA19C7", 1)}

          {proc
            .slice(0, proc.length)
            .map((item, idp) =>
              proc[idp]
                .slice(0, proc[idp].length - 1)
                .map((items, idpp) => (
                  <Line.Segment
                    key={idpp + counter * 1000}
                    point1={proc[idp][idpp]}
                    point2={proc[idp][idpp + 1]}
                    opacity={1}
                    color={"Yellow"}
                  />
                ))
            )}
        </Mafs>
      );
    } else {
      setProccc(null);
    }
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
                // defaultValue={0}
                className="input"
                type="number"
                placeholder={`x${index + 1}`}
                value={inputx[index] !== undefined ? inputx[index] : ""}
                onChange={(e) =>
                  handleInputChangex(index, parseInt(e.target.value), 0)
                }
              />
              <input
                // defaultValue={0}
                className="input"
                type="number"
                placeholder={`y${index + 1}`}
                value={inputy[index] !== undefined ? inputy[index] : ""}
                onChange={(e) =>
                  handleInputChangey(index, parseInt(e.target.value), 1)
                }
              />
            </div>
            <br />
          </div>
        ))}
        <div className="input-group">
          <Switch onClick={handleLogicToggle} />
        </div>
        <div className="input-group">
          {isitdnc ? (
            <label className="label-2">Using DnC</label>
          ) : (
            <label className="label-2">Using BruteForce</label>
          )}
        </div>
        <div className="input-group">
          <Switch onClick={handleShowToggle} />
        </div>
        <div className="input-group">
          {isshow ? (
            <label className="label-2">Generated Points: ON</label>
          ) : (
            <label className="label-2">Generated Points: OFF</label>
          )}
        </div>
        <div className="input-group">
          <Switch onClick={handleDots} defaultValue={true} />
        </div>
        <div className="input-group">
          {isDots ? (
            <label className="label-2">Dots on Curve: ON</label>
          ) : (
            <label className="label-2">Dots on Curve: OFF</label>
          )}
        </div>
        <div className="input-group">
          <Switch onClick={handleProc} />
        </div>
        <div className="input-group">
          {isProc ? (
            <label className="label-2">Process: ON</label>
          ) : (
            <label className="label-2">Process: OFF</label>
          )}
        </div>
        <button className="addButton" onClick={handleBesierLogic}>
          Process Bezier Curve
        </button>
      </div>
      <div className="container" hidden={result.length === 0}>
        {daMafs}
        {daTime}
      </div>
      <div className="container" hidden={result.length === 0}>
        {daProc}
      </div>
      <div className="container" hidden={result.length === 0}>
        {daPoints}
      </div>
    </>
  );
}

export default App;
