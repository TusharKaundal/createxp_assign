import React from "react";
import { Calendar, SquareUser, User, MoveUp, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const icons = {
  clientName: User,
  createdAt: Calendar,
  updatedAt: Calendar,
  clientId: SquareUser,
};

const SortPanel = ({ sortCriteria }) => {
  return (
    <div>
      <h1 className="text-lg font-medium text-gray-900 pb-4">Sort By</h1>
      <div className="flex flex-col gap-4">
        {sortCriteria.map((item) => {
          const Icon = icons[item.field];
          if (item.selected) return null;
          return (
            <div key={item.field} className="flex">
              <div className="flex flex-1 gap-2 items-center text-gray-500 font-medium">
                <Icon className="w-4 h-4" />
                <p>{item.label}</p>
              </div>
              <div className="flex flex-2 justify-between items-center">
                <div className="flex gap-2">
                  {item.options.map((option) => (
                    <Button
                      key={option.label}
                      className="p-0 bg-gray-100 hover:bg-gray-300 hover:cursor-pointer text-gray-400 transition-colors font-medium rounded-[2px]"
                      size="sm"
                    >
                      {option.value === "asc" ? <MoveUp /> : <MoveDown />}
                      <span className="text-black">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-between pt-4 border-t">
          <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Clear all
          </button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">
            Apply Sort
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortPanel;
