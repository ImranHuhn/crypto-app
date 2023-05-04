import React from "react";
import { SortIcon } from "../IconComponent";

class TableHead extends React.Component {
  handleClick = () => {
    // console.log("clicked", this.props.item);
    this.props.sortingManager(this.props.item);
  };
  render() {
    const hasSort =
      this.props.item === "#" ||
      this.props.item === "Name" ||
      this.props.item === "Price" ||
      this.props.item === "1h" ||
      this.props.item === "24h" ||
      this.props.item === "7d";
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
