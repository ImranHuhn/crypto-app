import React from "react";
import {
  TableHeader,
  TitleWrapper,
  IconWrapper,
  TableHeaderSort,
} from "./TableHead.styles";
import { SortIcon } from "../IconComponent";

export const TableHead = ({ sortingManager, tableColumns, item }) => {
  const handleClick = () => {
    sortingManager(item[0]);
  };
  const hasSort = Object.values(tableColumns).slice(0, 6).includes(item[1]);
  return (
    <>
      {hasSort && (
        <TableHeaderSort onClick={handleClick}>
          <TitleWrapper>
            {item[1]}
            <IconWrapper>
              <SortIcon />
            </IconWrapper>
          </TitleWrapper>
        </TableHeaderSort>
      )}
      {!hasSort && (
        <TableHeader>
          <TitleWrapper>{item[1]}</TitleWrapper>
        </TableHeader>
      )}
    </>
  );
};
