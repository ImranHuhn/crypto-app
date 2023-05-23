import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  longDollarFormat,
  abbreviateDollar,
  percentageFormat,
} from "utils/numberFormat";
import { FillBar } from "./TableData.styles";
import { ChevronIcon } from "Icons";

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
  const capitalizedId = id.charAt(0).toUpperCase() + id.slice(1);
  const capitalSymbol = symbol.toUpperCase();
  const price = longDollarFormat(current_price);
  const percentage_1h = percentageFormat(
    price_change_percentage_1h_in_currency,
    2
  );
  const percentage_24h = percentageFormat(
    price_change_percentage_24h_in_currency,
    2
  );
  const percentage_7d = percentageFormat(
    price_change_percentage_7d_in_currency,
    2
  );
  const volume = abbreviateDollar(total_volume, 2);
  const market = abbreviateDollar(market_cap, 2);
  const circulatingSupply = abbreviateDollar(circulating_supply, 2);
  const totalSupply = abbreviateDollar(total_supply, 2);

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const data = {
    labels: props.item.sparkline_in_7d.price.map((el, i) => i),
    datasets: [
      {
        label: "Dataset",
        data: props.item.sparkline_in_7d.price.map((price) => price),
        borderColor: "rgb(50, 205, 50)",
        backgroundColor: "rgba(50, 205, 50, 0.5)",
        cubicInterpolationMode: "monotone",
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };
  return (
    <tr className="h-20 border-b border-slate-700">
      <td>{market_cap_rank}</td>
      <td>
        <div className="flex">
          <img className="w-6" src={image} />
          {capitalizedId} ({capitalSymbol})
        </div>
      </td>
      <td>{price}</td>
      <td
        className={`${
          price_change_percentage_1h_in_currency < 0
            ? `text-[#e5113c]`
            : `text-[#00f629]`
        }`}
      >
        <div className="flex items-center">
          <div className="w-5 h-5 ">
            <ChevronIcon />
          </div>

          {percentage_1h}
        </div>
      </td>
      <td
        className={`${
          price_change_percentage_24h_in_currency < 0
            ? `text-[#e5113c]`
            : `text-[#00f629]`
        }`}
      >
        <div className="flex items-center">
          <div className="w-5 h-5">
            <ChevronIcon />
          </div>
          {percentage_24h}
        </div>
      </td>
      <td
        className={`${
          price_change_percentage_7d_in_currency < 0
            ? `text-[#e5113c]`
            : `text-[#00f629]`
        }`}
      >
        <div className="flex items-center">
          <div className="w-5 h-5">
            <ChevronIcon />
          </div>
          {percentage_7d}
        </div>
      </td>
      <td colSpan="2" className="relative pr-5">
        <div className="flex justify-between w-64">
          <div>
            <ul>
              <li className="list-disc ml-5">{volume}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="list-disc">{market}</li>
            </ul>
          </div>
        </div>
        <div className="bg-white w-64 h-2 mb-2 rounded-xl overflow-hidden">
          <FillBar
            fill={(total_volume / market_cap) * 100}
            className="bg-black h-full rounded-xl overflow-hidden"
          ></FillBar>
        </div>
      </td>
      <td className="relative pr-5">
        <ul className="flex justify-between w-64">
          <li className="list-disc ml-5">{circulatingSupply}</li>
          <li className="list-disc">{totalSupply}</li>
        </ul>
        <div className="bg-white w-64 h-2 mb-2 rounded-xl overflow-hidden">
          <FillBar
            fill={(circulating_supply / total_supply) * 100}
            className="bg-black h-full rounded-xl overflow-hidden"
          ></FillBar>
        </div>
      </td>
      <td>
        <div className="h-10 w-32">
          <Line options={options} data={data} />
        </div>
      </td>
    </tr>
  );
};
