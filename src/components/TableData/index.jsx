import React from "react";
// import Skeleton from "react-loading-skeleton";
import { TableRow } from "./TableData.styles";

class TableData extends React.Component {
  render() {
    return (
      <TableRow>
        <td>{props.item?.market_cap_rank}</td>
        <td>
          <img src={props.item?.image} style={{ width: "24px" }} />
          {props.item?.id} ({props.item?.symbol})
        </td>
        <td>{props.item?.current_price}</td>
        <td>{props.item?.price_change_percentage_1h_in_currency}</td>
        <td>{props.item?.price_change_percentage_24h_in_currency}</td>
        <td>{props.item?.price_change_percentage_7d_in_currency}</td>
        <td>
          {props.item?.total_volume}
          {" / "}
          {props.item?.market_cap}
        </td>
        <td>
          {" "}
          {props.item?.circulating_supply}
          {" / "}
          {props.item?.total_supply}
        </td>
        <td>9</td>
      </TableRow>
    );
  }
}

export default TableData;
