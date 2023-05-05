import React from "react";
// import Skeleton from "react-loading-skeleton";
import { TableRow, Image } from "./TableData.styles";

export const TableData = (props) => {
  const {
    market_cap_rank,
    image,
    id,
    symbol,
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    total_volume,
    market_cap,
    circulating_supply,
    total_supply,
  } = props.item || {};
  return (
    <TableRow>
      <td>{market_cap_rank}</td>
      <td>
        <Image src={image} />
        {id} ({symbol})
      </td>
      <td>{current_price}</td>
      <td>{price_change_percentage_1h_in_currency}</td>
      <td>{price_change_percentage_24h_in_currency}</td>
      <td>{price_change_percentage_7d_in_currency}</td>
      <td>
        {total_volume}
        {" / "}
        {market_cap}
      </td>
      <td>
        {" "}
        {circulating_supply}
        {" / "}
        {total_supply}
      </td>
      <td>9</td>
    </TableRow>
  );
};
