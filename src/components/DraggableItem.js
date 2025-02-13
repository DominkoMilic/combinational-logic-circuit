import { useDrag } from "react-dnd";
const ItemType = "ITEM";

function DraggableItem({ item, onClick }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleClick = (e) => {
    if (!e.target.closest(".scroll-item")) {
      onClick(e, item);
    }
  };

  return (
    <div
      ref={drag}
      className="scroll-item"
      onClick={handleClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item.content}
    </div>
  );
}

export default DraggableItem;
