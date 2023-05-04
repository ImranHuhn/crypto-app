import React from "react";
import { SortIcon } from "../IconComponent";

class TableHead extends React.Component {
  render() {
    const hasIcon =
      this.props.item === "#" ||
      this.props.item === "Name" ||
      this.props.item === "Price" ||
      this.props.item === "1h" ||
      this.props.item === "24h" ||
      this.props.item === "7d";
    return (
      <th
        onClick={this.props.sortRank}
        style={{
          cursor: "pointer",
          textAlign: "left",
          minWidth: "50px",
        }}
      >
        <div style={{ display: "flex" }}>
          {this.props.item}
          {hasIcon && (
            <div style={{ width: "20px", height: "20px" }}>
              <SortIcon />
            </div>
          )}
        </div>
      </th>
    );
  }
}

export default TableHead;
