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
import axios from "axios";

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
    try {
      const { data } = await axios(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
      );
      //   console.log("test", data);
      this.setState({ bitcoinData: data });
      //   return data;
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    this.handleMainCharts();
  };

  render() {
    console.log("test", this.state.bitcoinData?.prices.map((el) => el[0]))

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
      labels: this.state.bitcoinData?.prices.map((el) => el[0]),
      datasets: [
        {
          label: "Dataset",
          data: this.state.bitcoinData?.prices.map((price) => price[1]),
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
      labels: this.state.bitcoinData?.total_volumes.map((el) => el[0]),
      datasets: [
        {
          label: "Dataset",
          data: this.state.bitcoinData?.total_volumes.map(
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
        <div>Overview</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            className="third"
            style={{
              borderRadius: "10px",
              width: "48%",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute" }}>
              <h3>BTC Price</h3>
              <h1>$13.431 mln</h1>
              <h3>Jun 14, 2021 (should be today's date)</h3>
            </div>
            {/* every 3rd day in a month */}
            <Line options={lineOptions} data={priceData} />
          </div>
          <div
            className="third"
            style={{
              borderRadius: "10px",
              width: "48%",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute" }}>
              <h3>BTC Volume</h3>
              <h1>$807.24 bln</h1>
              <h3>Jun 14, 2021 (should be today's date)</h3>
            </div>
            {/* every hour from 0 -24 */}
            <Bar options={lineOptions} data={volumeData} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainCharts;
