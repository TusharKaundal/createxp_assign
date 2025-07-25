import React from "react";
import {
  Calendar,
  SquareUser,
  User,
  MoveUp,
  MoveDown,
  X,
  GripVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const icons = {
  clientName: User,
  createdAt: Calendar,
  updatedAt: Calendar,
  clientId: SquareUser,
};

const SortListItem = ({ criteria, handleSortButton, onRemove, isSortable }) => {
  const {
    listeners,
    setNodeRef,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: criteria.field,
    disabled: !isSortable,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const Icon = icons[criteria.field];
  return (
    <div
      className={`flex transition-all duration-200 rounded-md ${
        isDragging ? "shadow-lg py-1" : isSortable && "hover:shadow-sm"
      }`}
      ref={setNodeRef}
      style={style}
    >
      <div
        className={`flex flex-1 gap-2 items-center text-gray-500  font-medium`}
      >
        {isSortable && (
          <Button
            variant="ghost"
            className="cursor-grab active:cursor-grabbing has-[>svg]:p-0 hover:bg-gray-100 rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </Button>
        )}
        <Icon className="w-4 h-4" />
        <p className={criteria.selected ? "text-black" : "text-gray-500"}>
          {criteria.label}
        </p>
      </div>
      <div className="flex flex-2 justify-between items-center">
        <div className="flex gap-2">
          {criteria.options.map((option) => (
            <Button
              key={option.label}
              className={clsx(
                "hover:cursor-pointer text-gray-400 transition-colors rounded-[2px]",
                {
                  "bg-gray-100 hover:bg-gray-200":
                    criteria.selected !== option.value,
                  "bg-blue-100 hover:bg-blue-200":
                    criteria.selected === option.value,
                }
              )}
              size="sm"
              onClick={() => handleSortButton(criteria, option.value)}
            >
              {option.value === "asc" || option.value === "newest" ? (
                <MoveUp />
              ) : (
                <MoveDown />
              )}
              <span
                className={clsx("transition-colors", {
                  "text-black": criteria.selected !== option.value,
                  "text-blue-500": criteria.selected === option.value,
                })}
              >
                {option.label}
              </span>
            </Button>
          ))}
        </div>
        {isSortable && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(criteria)}
          >
            <X />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SortListItem;
