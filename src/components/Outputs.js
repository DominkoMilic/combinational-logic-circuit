import { React } from "react";
import "./componentsCss/Outputs.css";

const Outputs = () => {
  const outputIds = [];
  for (let i = 1; i <= 24; i++) {
    outputIds.push(i.toString());
  }

  return (
    <div>
      {outputIds.map((outputIds) => (
        <div key={outputIds} className="output" id={outputIds}>
          {outputIds}
          <div className="bulb-output"></div>
        </div>
      ))}
    </div>
  );
};

export default Outputs;
