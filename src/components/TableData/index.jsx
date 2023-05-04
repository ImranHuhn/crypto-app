import React from "react";
// import Skeleton from "react-loading-skeleton";
import { TableRow } from "./TableData.styles";

class TableData extends React.Component {
  render() {
    // let sortedAllCoins = this.props.allCoins.map((item) => item);

    // sortedAllCoins.sort((a, b) => {
    //   if (this.state.sort === true && this.state.selection === "rank") {
    //     return a.market_cap_rank - b.market_cap_rank;
    //   } else if (this.state.sort === false && this.state.selection === "rank") {
    //     return b.market_cap_rank - a.market_cap_rank;
    //   } else if (this.state.sort === true && this.state.selection === "name") {
    //     return a.id.localeCompare(b.id);
    //   } else if (this.state.sort === false && this.state.selection === "name") {
    //     return b.id.localeCompare(a.id);
    //   } else if (this.state.sort === true && this.state.selection === "price") {
    //     return a.current_price - b.current_price;
    //   } else if (
    //     this.state.sort === false &&
    //     this.state.selection === "price"
    //   ) {
    //     return b.current_price - a.current_price;
    //   } else if (
    //     this.state.sort === true &&
    //     this.state.selection === "one-hour"
    //   ) {
    //     return (
    //       a.price_change_percentage_1h_in_currency -
    //       b.price_change_percentage_1h_in_currency
    //     );
    //   } else if (
    //     this.state.sort === false &&
    //     this.state.selection === "one-hour"
    //   ) {
    //     return (
    //       b.price_change_percentage_1h_in_currency -
    //       a.price_change_percentage_1h_in_currency
    //     );
    //   } else if (
    //     this.state.sort === true &&
    //     this.state.selection === "twentyfour-hours"
    //   ) {
    //     return (
    //       a.price_change_percentage_24h_in_currency -
    //       b.price_change_percentage_24h_in_currency
    //     );
    //   } else if (
    //     this.state.sort === false &&
    //     this.state.selection === "twentyfour-hours"
    //   ) {
    //     return (
    //       b.price_change_percentage_24h_in_currency -
    //       a.price_change_percentage_24h_in_currency
    //     );
    //   } else if (
    //     this.state.sort === true &&
    //     this.state.selection === "seven-days"
    //   ) {
    //     return (
    //       a.price_change_percentage_7d_in_currency -
    //       b.price_change_percentage_7d_in_currency
    //     );
    //   } else if (
    //     this.state.sort === false &&
    //     this.state.selection === "seven-days"
    //   ) {
    //     return (
    //       b.price_change_percentage_7d_in_currency -
    //       a.price_change_percentage_7d_in_currency
    //     );
    //   } else {
    //     return sortedAllCoins;
    //   }
    // });
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
