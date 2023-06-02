import { useState, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";
import { getBitcoinData } from "utils/api";
import { getDateValuePairs } from "utils/objectEntries";
import { abbreviateCurrency } from "utils/numberFormat";
import { Context } from "../../context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement
);

export const MainCharts = () => {
  const [bitcoinData, setBitcoinData] = useState(null);

  const currency = useContext(Context);

  const { prices = [], total_volumes = [] } = bitcoinData || {};
  const lastPrice = prices[prices?.length - 1] || [];
  const lastVolume = total_volumes[total_volumes?.length - 1] || [];
  const bitcoinPrice = abbreviateCurrency({
    number: lastPrice[1],
    decimalPlaces: 3,
    currency: currency,
  });
  const bitcoinVolume = abbreviateCurrency({
    number: lastVolume[1],
    decimalPlaces: 3,
    currency: currency,
  });
  const currentDate = moment().format("MMMM Do YYYY");
  const { time: marketTime, price: marketPrice } = getDateValuePairs(prices);
  const { time: volumeTime, price: volumePrice } =
    getDateValuePairs(total_volumes);

  const lineOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const priceData = {
    labels: marketTime.map((time) => moment(time).format("DD")),
    datasets: [
      {
        label: "Dataset",
        data: marketPrice.map((price) => price),
        cubicInterpolationMode: "monotone",
        tension: 0.3,
        fill: true,
        borderColor: "rgba(50,205,50,1)",
        backgroundColor: ({ chart: { ctx } }) => {
          const gradient = ctx.createLinearGradient(0, 450, 0, 0);
          gradient.addColorStop(1, "rgba(50,205,50,.4)");
          gradient.addColorStop(0.5, "rgba(50, 205, 50, 0.2)");
          gradient.addColorStop(0, "rgba(50, 205, 50, 0)");
          return gradient;
        },
      },
    ],
  };

  const volumeData = {
    labels: volumeTime.map((time) => moment(time).format("DD")),
    datasets: [
      {
        label: "Dataset",
        data: volumePrice.map((price) => price),
        borderColor: "rgba(33,114,229,255)",
        backgroundColor: "rgba(33,114,229,255)",
        below: "rgba(33,114,229,255)",
      },
    ],
  };

  const handleMainCharts = async () => {
    const bitcoinData = await getBitcoinData();
    setBitcoinData(bitcoinData);
  };

  useEffect(() => {
    handleMainCharts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-black font-bold dark:text-white py-6">
        Bitcoin Overview
      </h1>
      <div className="flex flex-row justify-between w-full">
        <div className="bg-white dark:bg-[#191b1f] basis-[48%] rounded-lg relative">
          <div className="absolute py-5 px-8">
            <h3 className="text-xl">BTC Price</h3>
            <h1 className="font-bold text-4xl">{bitcoinPrice}</h1>
            <h3 className="text-xl">{currentDate}</h3>
          </div>
          <Line
            className="py-10 px-20"
            options={lineOptions}
            data={priceData}
          />
        </div>
        <div className="bg-white dark:bg-[#191b1f] basis-[48%] rounded-lg relative">
          <div className="absolute py-5 px-8">
            <h3 className="text-xl">BTC Volume</h3>
            <h1 className="font-bold	text-4xl">{bitcoinVolume}</h1>
            <h3 className="text-xl">{currentDate}</h3>
          </div>
          <Bar
            className="py-10 px-20"
            options={lineOptions}
            data={volumeData}
          />
        </div>
      </div>
    </div>
  );
};
