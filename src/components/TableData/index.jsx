import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TableRow, Image } from "./TableData.styles";

//////////////////////////////////////////////////////
// import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
//////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const labels = props.item.sparkline_in_7d.price.map((el, i) => i);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: props.item.sparkline_in_7d.price.map((price) => price),
        borderColor: "rgb(50, 205, 50)",
        backgroundColor: "rgba(50, 205, 50, 0.5)",
        cubicInterpolationMode: "monotone",
        tension: 0.3,
      },
    ],
  };

  const test = () => {
    console.log("test", props.item.sparkline_in_7d.price.map((price) => price));
  };
  test();
  //////////////////////////////////////////////////////

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
      <td>{total_volume || <Skeleton />}</td>
      <td>{market_cap || <Skeleton />}</td>
      <td>
        {circulating_supply || <Skeleton />}
        {" / "}
        {total_supply || <Skeleton />}
      </td>
      <td>
        <Line options={options} data={data} />
      </td>
    </TableRow>
  );
};
