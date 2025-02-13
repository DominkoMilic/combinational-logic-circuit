import { useDrop } from "react-dnd";

const ItemType = "ITEM";

function DroppableArea({ droppedItems, onDrop, onItemClick }) {
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
          onClick={(e) => {
            e.stopPropagation();
            onItemClick(item.id, e);
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

export default DroppableArea;
