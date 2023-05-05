import React from "react";
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
          <th
            onClick={this.handleClick}
            style={{
              cursor: "pointer",
              textAlign: "left",
              minWidth: "50px",
            }}
          >
            <div style={{ display: "flex" }}>
              {this.props.item}
              <div style={{ width: "20px", height: "20px" }}>
                <SortIcon />
              </div>
            </div>
          </th>
        )}
        {!hasSort && (
          <th
            style={{
              textAlign: "left",
              minWidth: "50px",
            }}
          >
            <div style={{ display: "flex" }}>{this.props.item}</div>
          </th>
        )}
      </>
    );
  }
}

export default TableHead;
