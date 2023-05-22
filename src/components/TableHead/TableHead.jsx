import React from "react";
import { SortIcon } from "Icons";

export const TableHead = ({ sortingManager, tableColumns, item }) => {
  const dataKey = item[0];
  const columnTitle = item[1];
  const isVolume = dataKey === "total_volume";
  const isMarket = dataKey === "market_cap";
  const hasSort = Object.values(tableColumns).slice(0, 8).includes(columnTitle);
  const handleClick = () => {
    sortingManager(dataKey);
  };
  return (
    <>
      {hasSort && (
        <th
          className={`text-left cursor-pointer ${isVolume ? "w-[112px]" : ""}`}
          onClick={handleClick}
        >
          <div className="flex items-center">
            {isVolume && (
              <div className="w-5 h-5">
                <SortIcon />
              </div>
            )}
            {isMarket ? "/" : ""}
            {columnTitle}
            {!isVolume && (
              <div className="w-5 h-5">
                <SortIcon />
              </div>
            )}
          </div>
        </th>
      )}
      {!hasSort && (
        <th className="text-left">
          <div className="flex">{columnTitle}</div>
        </th>
      )}
    </>
  );
};
