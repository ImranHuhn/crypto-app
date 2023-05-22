import React from "react";
import { SortIcon } from "Icons";

export const TableHead = ({ sortingManager, tableColumns, item }) => {
  const handleClick = () => {
    sortingManager(item[0]);
  };
  const hasSort = Object.values(tableColumns).slice(0, 8).includes(item[1]);
  return (
    <>
      {hasSort && (
        <th
          className="text-left cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex items-center">
            {item[1]}
            <div className="w-5 h-5">
              <SortIcon />
            </div>
          </div>
        </th>
      )}
      {/* I will have to add condition for volume and marketcap for styling */}
      {!hasSort && (
        <th className="text-left">
          <div className="flex">{item[1]}</div>
        </th>
      )}
    </>
  );
};
