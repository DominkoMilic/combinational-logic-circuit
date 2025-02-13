import "./App.css";
import { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ButtonDisplay from "./components/ButtonDisplay";

const ItemType = "ITEM";

function DraggableItem({ item, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRightClick = (e) => {
    e.preventDefault();
    onDelete(item.id);
  };

  return (
    <div
      ref={drag}
      className="scroll-item"
      onContextMenu={handleRightClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item.content}
    </div>
  );
}

function DroppableArea({ droppedItems, onDrop, onItemDelete }) {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        onDrop(item, offset);
      }
    },
  }));

  return (
    <div ref={drop} className="main-content">
      {droppedItems.map((item, index) => (
        <div
          key={index}
          className="dropped-item"
          onContextMenu={(e) => {
            e.preventDefault();
            onItemDelete(item.id);
          }}
          style={{
            position: "absolute",
            left: `${item.x}px`,
            top: `${item.y}px`,
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [droppedItems, setDroppedItems] = useState([]);
  let nextId = 1;

  const handleDrop = (item, offset) => {
    setDroppedItems((prev) => [
      ...prev,
      { ...item, id: nextId, x: offset.x, y: offset.y },
    ]);
    nextId += 1;
    console.log("item id: ", nextId);
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
      <div className="main-container">
        <DroppableArea
          droppedItems={droppedItems}
          onDrop={handleDrop}
          onItemDelete={handleItemDelete}
        />

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
            <ButtonDisplay />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
