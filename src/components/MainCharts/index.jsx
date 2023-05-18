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
import { Container, Wrapper, TextBox } from "./MainCharts.styles";

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
        <h1 className="text">Bitcoin Overview</h1>
        <Container>
          <Wrapper className="third">
            <TextBox>
              <h3>BTC Price</h3>
              <h1>{lastPrice[1]}</h1>
              <h3>{currentDate}</h3>
            </TextBox>
            <Line options={lineOptions} data={priceData} />
          </Wrapper>
          <Wrapper className="third">
            <TextBox>
              <h3>BTC Volume</h3>
              <h1>{lastVolume[1]}</h1>
              <h3>{currentDate}</h3>
            </TextBox>
            <Bar options={lineOptions} data={volumeData} />
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default MainCharts;
