import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  longDollarFormat,
  abbreviateDollar,
  percentageFormat,
} from "utils/numberFormat";
import { FillBar, List } from "./TableData.styles";
import { ChevronTrendIcon } from "Icons";
import { randomColor } from "utils/colorGenerator";

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
    price_change_percentage_24h,
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
  const color = randomColor();

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
        borderColor: `${
          price_change_percentage_24h < 0 ? `#e5113c` : `#00f629`
        }`,
        cubicInterpolationMode: "monotone",
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };
  return (
    <tr className="h-20 border-b border-slate-600">
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
          <div
            className={`w-5 h-5 ${
              price_change_percentage_1h_in_currency < 0 ? `rotate-180` : ""
            }`}
          >
            <ChevronTrendIcon
              filler={
                price_change_percentage_1h_in_currency < 0
                  ? "#e5113c"
                  : "#00f629"
              }
            />
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
          <div
            className={`w-5 h-5 ${
              price_change_percentage_24h_in_currency < 0 ? `rotate-180` : ""
            }`}
          >
            <ChevronTrendIcon
              filler={
                price_change_percentage_24h_in_currency < 0
                  ? "#e5113c"
                  : "#00f629"
              }
            />
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
          <div
            className={`w-5 h-5 ${
              price_change_percentage_7d_in_currency < 0 ? `rotate-180` : ""
            }`}
          >
            <ChevronTrendIcon
              filler={
                price_change_percentage_7d_in_currency < 0
                  ? "#e5113c"
                  : "#00f629"
              }
            />
          </div>
          {percentage_7d}
        </div>
      </td>
      <td colSpan="2" className="relative pr-5">
        <div className="flex justify-between w-64">
          <div>
            <ul>
              <List textColor={color} className="list-disc ml-5">
                {volume}
              </List>
            </ul>
          </div>
          <div>
            <ul>
              <List textColor={color} className="list-disc">
                {market}
              </List>
            </ul>
          </div>
        </div>
        <div className="bg-slate-200 dark:bg-white w-64 h-2 mb-2 rounded-xl overflow-hidden">
          <FillBar
            fillWidth={(total_volume / market_cap) * 100}
            fillColor={color}
            className="bg-black h-full rounded-xl overflow-hidden"
          ></FillBar>
        </div>
      </td>
      <td className="relative pr-5">
        <ul className="flex justify-between w-64">
          <List textColor={color} className="list-disc ml-5">
            {circulatingSupply}
          </List>
          <List textColor={color} className="list-disc">
            {totalSupply}
          </List>
        </ul>
        <div className="bg-slate-200 dark:bg-white w-64 h-2 mb-2 rounded-xl overflow-hidden">
          <FillBar
            fillWidth={(circulating_supply / total_supply) * 100}
            fillColor={color}
            className="h-full rounded-xl overflow-hidden"
          ></FillBar>
        </div>
      </td>
      <td>
        {/* <div className="h-10 w-32"> // h-10 caused double vertical scroll */}
        <div className=" w-32">
          <Line options={options} data={data} />
        </div>
      </td>
    </tr>
  );
};
