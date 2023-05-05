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
    sortingManager(item);
  };
  const hasSort = tableColumns.slice(0, 6).includes(item);
  return (
    <>
      {hasSort && (
        <TableHeaderSort onClick={handleClick}>
          <TitleWrapper>
            {item}
            <IconWrapper>
              <SortIcon />
            </IconWrapper>
          </TitleWrapper>
        </TableHeaderSort>
      )}
      {!hasSort && (
        <TableHeader>
          <TitleWrapper>{item}</TitleWrapper>
        </TableHeader>
      )}
    </>
  );
};
