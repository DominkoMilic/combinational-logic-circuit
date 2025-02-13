const updateBulbColor = (updatedBulbColors, bulbId) => {
  if (updatedBulbColors[bulbId] === "green") {
    updatedBulbColors[bulbId] = "red";
  } else {
    updatedBulbColors[bulbId] = "green";
  }

  return updatedBulbColors;
};

const createBinaryFromBulbLights = (updatedBulbColors) => {
  let binaryNumber = "";

  updatedBulbColors.forEach((bulb) => {
    if (bulb === "green") {
      binaryNumber += "1";
    } else {
      binaryNumber += "0";
    }
  });
  binaryNumber = binaryNumber.split("").reverse().join("");

  return binaryNumber;
};

const createDecimalFromBinary = (binary) => {
  let binaryArray = binary.split("");
  let decimalValue = 0;
  binaryArray.forEach((element, index) => {
    if (element === "1") {
      decimalValue += Math.pow(2, 7 - index);
    }
  });
  return decimalValue;
};

const createBinaryFromDecimal = (decimal) => {
  let binary = ["0", "0", "0", "0", "0", "0", "0", "0"];
  binary.forEach((_, index) => {
    if (decimal - Math.pow(2, 7 - index) >= 0) {
      binary[index] = "1";
      decimal -= Math.pow(2, 7 - index);
    }
  });

  return binary.join("");
};

const updateBulbsForCP = (binary) => {
  let bulbColorArray = [];
  binary.forEach((element) => {
    if (element === "0") {
      bulbColorArray.push("red");
    } else {
      bulbColorArray.push("green");
    }
  });

  return bulbColorArray.reverse("");
};

export {
  createBinaryFromBulbLights,
  updateBulbColor,
  createDecimalFromBinary,
  createBinaryFromDecimal,
  updateBulbsForCP,
};
