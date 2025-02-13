import { React, useState } from "react";
import "./componentsCss/ButtonDisplay.css";
import {
  createBinaryFromBulbLights,
  updateBulbColor,
  createDecimalFromBinary,
  createBinaryFromDecimal,
  updateBulbsForCP,
} from "./utilis/ButtonDisplayUtilis";

const ButtonDisplay = ({ setDroppedItems }) => {
  const [binaryRepresentation, setBinaryRepresentation] = useState("00000000");
  const [bulbColors, setBulbColors] = useState([
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
  ]);

  const handleBulbButtonClick = (bulbId) => {
    let updatedBulbColors = [...bulbColors];
    updatedBulbColors = updateBulbColor(updatedBulbColors, bulbId);
    setBulbColors(updatedBulbColors);

    setBinaryRepresentation(createBinaryFromBulbLights(updatedBulbColors));
  };

  const handleCPButtonClick = () => {
    let decimalValue = createDecimalFromBinary(binaryRepresentation);

    if (decimalValue < 255) {
      decimalValue += 1;
    } else {
      decimalValue = 0;
    }

    const binaryValue = createBinaryFromDecimal(decimalValue);

    setBinaryRepresentation(binaryValue);

    setBulbColors(updateBulbsForCP(binaryValue.split("")));
  };

  const handleResetButtonClick = () => {
    setBulbColors(["red", "red", "red", "red", "red", "red", "red", "red"]);
    setBinaryRepresentation("00000000");
  };

  const handleClearButtonClick = () => {
    setDroppedItems([]);
  };

  const bulbIds = ["7", "6", "5", "4", "3", "2", "1", "0"];

  return (
    <div className="button-display-container">
      <button
        className="clear-screen-button"
        onClick={() => handleClearButtonClick()}
      >
        CLEAR
      </button>

      <div className="left-container">
        <div className="bulbs-container">
          {bulbIds.map((bulbId) => (
            <div
              key={bulbId}
              className="bulb"
              id={bulbId}
              style={{ backgroundColor: bulbColors[bulbId] }}
            ></div>
          ))}
        </div>

        <div className="buttons-container">
          {bulbIds.map((bulbId, index) => (
            <button key={bulbId} onClick={() => handleBulbButtonClick(bulbId)}>
              {7 - index}
            </button>
          ))}
        </div>
      </div>

      <div className="right-container">
        <button className="main-button" onClick={handleCPButtonClick}>
          CP
        </button>
        <button className="main-button" onClick={handleResetButtonClick}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default ButtonDisplay;
