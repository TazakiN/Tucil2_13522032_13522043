import React, { useState } from "react";
import "./App.css";

function App() {
  const [pointNumber, setPointNumber] = useState(3);
  const [IterNumber, setIterNumber] = useState(1);
  const [inputs, setInputs] = useState([]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };

  return (
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
          value={IterNumber}
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
              type="text"
              placeholder={`x${index + 1}`}
              value={inputs[index] ? inputs[index][0] : ""}
              onChange={(e) => handleInputChange(index, e.target.value, 0)}
            />
            <input
              className="input"
              type="text"
              placeholder={`y${index + 1}`}
              value={inputs[index] ? inputs[index][1] : ""}
              onChange={(e) => handleInputChange(index, e.target.value, 1)}
            />
          </div>
          <br />
        </div>
      ))}
      <button className="addButton" onClick={handleAddInput}>
        Add Input
      </button>
    </div>
  );
}

export default App;
