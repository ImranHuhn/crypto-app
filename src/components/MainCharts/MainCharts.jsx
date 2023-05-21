import React from "react";
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
import { threeDecimalAbbreviate } from "utils/calculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement
);

class MainCharts extends React.Component {
  state = {
    bitcoinData: null,
  };

  handleMainCharts = async () => {
    const bitcoinData = await getBitcoinData();
    this.setState({ bitcoinData });
  };

  componentDidMount = async () => {
    this.handleMainCharts();
  };

  render() {
    const { prices = [], total_volumes = [] } = this.state.bitcoinData || {};
    const lastPrice = prices[prices?.length - 1] || [];
    const lastVolume = total_volumes[total_volumes?.length - 1] || [];
    const bitcoinPrice = threeDecimalAbbreviate(lastPrice[1]);
    const bitcoinVolume = threeDecimalAbbreviate(lastVolume[1]);
    const currentDate = moment().format("MMMM Do YYYY");

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
      labels: prices?.map((el) => moment(el[0]).format("DD")),
      datasets: [
        {
          label: "Dataset",
          data: prices?.map((price) => price[1]),
          // borderColor: "rgb(50, 205, 50)",
          // backgroundColor: "rgba(50, 205, 50, 0.5)",
          // background: "rgb(50,205,50)",
          // background: "linear-gradient(180deg, rgba(50,205,50,1) 35%, rgba(50,205,50,0) 100%)",
          cubicInterpolationMode: "monotone",
          tension: 0.3,
          fill: {
            target: "origin",
            above: "rgb(50, 205, 50)",
            below: "rgb(50, 205, 50)",
          },
        },
      ],
    };

    const volumeData = {
      labels: total_volumes?.map((el) => moment(el[0]).format("DD")),
      datasets: [
        {
          label: "Dataset",
          data: total_volumes?.map((volume) => volume[1]),
          borderColor: "rgba(33,114,229,255)",
          backgroundColor: "rgba(33,114,229,255)",
          below: "rgba(33,114,229,255)",
        },
      ],
    };
    return (
      <div>
        <h1 className="text-3xl text-black font-bold dark:text-white py-6">
          Bitcoin Overview
        </h1>
        <div className="flex flex-row justify-between w-full">
          <div className="bg-white dark:bg-[#191b1f] basis-[48%] rounded-lg relative">
            <div className="absolute py-5 px-8">
              <h3 className="text-xl">BTC Price</h3>
              <h1 className="font-bold text-4xl">${bitcoinPrice}</h1>
              <h3 className="text-xl">{currentDate}</h3>
            </div>
            <Line className="py-10 px-20" options={lineOptions} data={priceData} />
          </div>
          <div className="bg-white dark:bg-[#191b1f] basis-[48%] rounded-lg relative">
            <div className="absolute py-5 px-8">
              <h3 className="text-xl">BTC Volume</h3>
              <h1 className="font-bold	text-4xl">${bitcoinVolume}</h1>
              <h3 className="text-xl">{currentDate}</h3>
            </div>
            <Bar className="py-10 px-20" options={lineOptions} data={volumeData} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainCharts;
