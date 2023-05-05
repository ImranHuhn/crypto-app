import React from "react";
// import Skeleton from "react-loading-skeleton";
import { TableRow } from "./TableData.styles";

class TableData extends React.Component {
  render() {
    return (
      <TableRow>
        <td>{this.props.item?.market_cap_rank}</td>
        <td>
          <img src={this.props.item?.image} style={{ width: "24px" }} />
          {this.props.item?.id} ({this.props.item?.symbol})
        </td>
        <td>{this.props.item?.current_price}</td>
        <td>{this.props.item?.price_change_percentage_1h_in_currency}</td>
        <td>{this.props.item?.price_change_percentage_24h_in_currency}</td>
        <td>{this.props.item?.price_change_percentage_7d_in_currency}</td>
        <td>
          {this.props.item?.total_volume}
          {" / "}
          {this.props.item?.market_cap}
        </td>
        <td>
          {" "}
          {this.props.item?.circulating_supply}
          {" / "}
          {this.props.item?.total_supply}
        </td>
        <td>9</td>
      </TableRow>
    );
  }
}

export default TableData;
