import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
      <td>{market_cap_rank || <Skeleton />}</td>
      <td>
        <Image src={image} />
        {id || <Skeleton />} ({symbol || <Skeleton />})
      </td>
      <td>{current_price || <Skeleton />}</td>
      <td>{price_change_percentage_1h_in_currency || <Skeleton />}</td>
      <td>{price_change_percentage_24h_in_currency || <Skeleton />}</td>
      <td>{price_change_percentage_7d_in_currency || <Skeleton />}</td>
      <td>
        {total_volume || <Skeleton />}
        {" / "}
        {market_cap || <Skeleton />}
      </td>
      <td>
        {" "}
        {circulating_supply || <Skeleton />}
        {" / "}
        {total_supply || <Skeleton />}
      </td>
      <td>9</td>
    </TableRow>
  );
};
