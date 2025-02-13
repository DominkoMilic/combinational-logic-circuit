import "./App.css";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ButtonDisplay from "./components/ButtonDisplay";
import Inputs from "./components/Inputs";
import Outputs from "./components/Outputs";
import DraggableItem from "./components/DraggableItem";
import DroppableArea from "./components/DroppableArea";
import SelectionPopup from "./components/SelectionPopup";

function App() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  let nextId = 1;

  const handleItemClick = (item, e) => {
    e.preventDefault();
    setSelectedItem(item);
    setPopupPosition({ x: e.clientX, y: e.clientY });
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleDrop = (item, offset) => {
    const container = document.querySelector(".main-container");

    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const adjustedX = offset.x - containerRect.left;
    const adjustedY = offset.y - containerRect.top;

    setDroppedItems((prev) => [
      ...prev,
      { ...item, id: nextId, x: adjustedX, y: adjustedY },
    ]);
    nextId += 1;
  };

  const handleItemDelete = (id) => {
    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const items = [
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
    { id: 3, content: "Item 3" },
    { id: 4, content: "Item 4" },
    { id: 5, content: "Item 5" },
    { id: 6, content: "Item 6" },
    { id: 7, content: "Item 7" },
    { id: 8, content: "Item 8" },
    { id: 9, content: "Item 9" },
    { id: 10, content: "Item 10" },
    { id: 11, content: "Item 11" },
    { id: 12, content: "Item 12" },
    { id: 13, content: "Item 13" },
    { id: 14, content: "Item 14" },
    { id: 15, content: "Item 15" },
    { id: 16, content: "Item 16" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-container" onClick={handleClosePopup}>
        <div className="content-wrapper">
          <div className="inputs-container">
            <Inputs />
          </div>
          <DroppableArea
            droppedItems={droppedItems}
            onDrop={handleDrop}
            onItemClick={handleItemClick}
          />
          <SelectionPopup
            visible={!!selectedItem}
            position={popupPosition}
            selectedItem={selectedItem}
            setDroppedItems={setDroppedItems}
          />
          <div className="output-container right">
            <Outputs />
          </div>
        </div>

        <div className="bottom-screen">
          <div className="bottom-scrollable">
            {items.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                onDelete={handleItemDelete}
              />
            ))}
          </div>
          <div className="buttons-display">
            <ButtonDisplay setDroppedItems={setDroppedItems} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
