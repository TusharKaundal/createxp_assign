import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SortListItem from "./sortListItem";
import clsx from "clsx";
import { sortOptions } from "@/lib/constant";

const SortPanel = ({ applySort, appliedSortCriteria }) => {
  const [sortCriteria, setSortCriteria] = useState(sortOptions);
  const [selectedSortCriteria, setselectedSortCriteria] = useState([]);
  console.log(appliedSortCriteria);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setselectedSortCriteria((items) => {
        const oldIndex = items.findIndex((item) => item.field === active.id);
        const newIndex = items.findIndex((item) => item.field === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    console.log(appliedSortCriteria);
    setselectedSortCriteria(appliedSortCriteria);

    const appliedFields = appliedSortCriteria.map((c) => c.field);
    const remainingSortOptions = sortOptions.filter(
      (c) => !appliedFields.includes(c.field)
    );
    setSortCriteria(remainingSortOptions);
  }, [appliedSortCriteria]);

  const addSortCriterion = (criteria, direction) => {
    const newCriteria = { ...criteria, selected: direction };
    setselectedSortCriteria((prev) => [...prev, newCriteria]);
    const filterSortCriteria = sortCriteria.filter(
      (item) => criteria.field !== item.field
    );
    setSortCriteria(filterSortCriteria);
  };

  const updateSortButton = (criteria, direction) => {
    const newappliedCriteria = selectedSortCriteria.map((appliedcriteria) =>
      appliedcriteria.field === criteria.field
        ? { ...appliedcriteria, selected: direction }
        : appliedcriteria
    );
    setselectedSortCriteria(newappliedCriteria);
  };

  const removeSortCriterion = (criteria) => {
    setselectedSortCriteria((prev) =>
      prev.filter((criterion) => criterion.field !== criteria.field)
    );
    setSortCriteria((prev) => [...prev, { ...criteria, selected: "" }]);
  };

  const clearAllSortCriteria = () => {
    setselectedSortCriteria([]);
    setSortCriteria(sortOptions);
  };

  const handleApplySortButton = () => {
    applySort(selectedSortCriteria);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-medium text-gray-900">Sort By</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={selectedSortCriteria.map((c) => c.field)}
          strategy={verticalListSortingStrategy}
        >
          {selectedSortCriteria.length > 0 && (
            <div className="flex flex-col gap-4">
              {selectedSortCriteria.map((item) => (
                <SortListItem
                  key={item.field}
                  criteria={item}
                  handleSortButton={updateSortButton}
                  onRemove={removeSortCriterion}
                  isSortable={item.selected !== ""}
                />
              ))}
            </div>
          )}
          {sortCriteria.length > 0 && (
            <div
              className={clsx("flex flex-col gap-4", {
                "pt-4 border-t":
                  selectedSortCriteria.length && sortCriteria.length,
              })}
            >
              {sortCriteria.map((item) => (
                <SortListItem
                  key={item.field}
                  criteria={item}
                  handleSortButton={addSortCriterion}
                  onRemove={removeSortCriterion}
                  isSortable={item.selected !== ""}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="ghost"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          onClick={clearAllSortCriteria}
        >
          Clear all
        </Button>
        <Button
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 hover:cursor-pointer"
          onClick={handleApplySortButton}
        >
          Apply Sort
        </Button>
      </div>
    </div>
  );
};

export default SortPanel;
