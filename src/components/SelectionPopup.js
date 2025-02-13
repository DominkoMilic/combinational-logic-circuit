import { React } from "react";
import "./componentsCss/SelectionPopup.css";

const SelectionPopup = ({
  visible,
  position,
  selectedItem,
  setDroppedItems,
}) => {
  if (!visible) return null;

  const handleDeleteItemClick = () => {
    setDroppedItems((prevItems) =>
      prevItems.filter((item) => item.id !== selectedItem)
    );
  };

  return (
    <div
      className="popup"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <button>Add cable</button>
      <button onClick={() => handleDeleteItemClick()}>Delete</button>
    </div>
  );
};

export default SelectionPopup;
