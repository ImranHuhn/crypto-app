import React from "react";
import {
  TableHeader,
  TitleWrapper,
  IconWrapper,
  TableHeaderSort,
} from "./TableHead.styles";
import { SortIcon } from "../IconComponent";

export const TableHead = (props) => {
  const handleClick = () => {
    props.sortingManager(props.item);
  };
  const hasSort = props.tableColumns.slice(0, 6).includes(props.item);
  return (
    <>
      {hasSort && (
        <TableHeaderSort onClick={handleClick}>
          <TitleWrapper>
            {props.item}
            <IconWrapper>
              <SortIcon />
            </IconWrapper>
          </TitleWrapper>
        </TableHeaderSort>
      )}
      {!hasSort && (
        <TableHeader>
          <TitleWrapper>{props.item}</TitleWrapper>
        </TableHeader>
      )}
    </>
  );
};