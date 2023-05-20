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
import { getBitcoinData } from "../../utils/api";

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
    const {prices = [], total_volumes = []} = this.state.bitcoinData || {}
    const lastPrice = prices[prices?.length-1] || []
    const lastVolume = total_volumes[total_volumes?.length-1] || []

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
      },
    };

    const priceData = {
      labels: prices?.map((el) => el[0]),
      datasets: [
        {
          label: "Dataset",
          data: prices?.map((price) => price[1]),
          borderColor: "rgb(50, 205, 50)",
          backgroundColor: "rgba(50, 205, 50, 0.5)",
          cubicInterpolationMode: "monotone",
          tension: 0.3,
          fill: "origin",
          below: "green",
        },
      ],
    };

    const volumeData = {
      labels: total_volumes?.map((el) => el[0]),
      datasets: [
        {
          label: "Dataset",
          data: total_volumes?.map(
            (volume) => volume[1]
          ),
          borderColor: "blue",
          backgroundColor: "lightblue",
          below: "blue",
        },
      ],
    };
    return (
      <div>
        <h1 className="text-red-500	">Bitcoin Overview</h1>
        <div className="flex flex-row justify-between w-full">
          <div className="third basis-[48%] rounded-lg relative">
            <div className="absolute">
              <h3>BTC Price</h3>
              <h1 className="font-bold	text-4xl">{lastPrice[1]}</h1>
              <h3>{currentDate}</h3>
            </div>
            <Line options={lineOptions} data={priceData} />
          </div>
          <div className="third basis-[48%] rounded-lg relative">
            <div className="absolute">
              <h3>BTC Volume</h3>
              <h1 className="font-bold	text-4xl">{lastVolume[1]}</h1>
              <h3>{currentDate}</h3>
            </div>
            <Bar options={lineOptions} data={volumeData} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainCharts;
