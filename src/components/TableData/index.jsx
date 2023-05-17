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
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
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
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
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
