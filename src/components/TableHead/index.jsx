import React from "react";
import {
  TableHeader,
  TitleWrapper,
  IconWrapper,
  TableHeaderSort,
} from "./TableHead.styles";
import { SortIcon } from "../IconComponent";

class TableHead extends React.Component {
  handleClick = () => {
    this.props.sortingManager(this.props.item);
  };
  render() {
    const hasSort = this.props.tableColumns
      .slice(0, 6)
      .includes(this.props.item);
    return (
      <>
        {hasSort && (
          <TableHeaderSort onClick={this.handleClick}>
            <TitleWrapper>
              {this.props.item}
              <IconWrapper>
                <SortIcon />
              </IconWrapper>
            </TitleWrapper>
          </TableHeaderSort>
        )}
        {!hasSort && (
          <TableHeader>
            <TitleWrapper>{this.props.item}</TitleWrapper>
          </TableHeader>
        )}
      </>
    );
  }
}

export default TableHead;
