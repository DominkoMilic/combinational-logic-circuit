import { React } from "react";
import "./componentsCss/Inputs.css";

const Inputs = () => {
  const inputIds = ["0", "1", "2", "3", "4", "5", "6", "7"];

  return (
    <div>
      {inputIds.map((inputIds) => (
        <div key={inputIds} className="input" id={inputIds}>
          <div className="input-row">{`X${inputIds}`}</div>
          <div className="divider"></div>
          <div className="input-row not-x">
            <span className="overline">{`X${inputIds}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inputs;
