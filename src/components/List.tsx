import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

export type ListProps<T> = {
  items: T[];
  setItems: (fn: (items: T[]) => T[]) => void;
  render: (item: T, index: number) => React.ReactNode;
};

export default function List<T extends { id: UniqueIdentifier }>({
  items,
  setItems,
  render,
}: ListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
          setItems((items: T[]) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over?.id);
            const res = arrayMove(items, oldIndex, newIndex);
            return res;
          });
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <SortableItem key={item.id} id={item.id}>
            {render(item, index)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
