import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        padding: "10px",
        margin: "5px",
        border: "1px solid black",
        backgroundColor: "lightgray",
        cursor: "grab",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {id}
    </div>
  );
};

const DragDropList = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3","item 4"]);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setItems((prev) => arrayMove(prev, prev.indexOf(active.id), prev.indexOf(over.id)));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragDropList;
