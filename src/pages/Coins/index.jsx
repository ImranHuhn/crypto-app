import React from "react";
import { getCoins } from "../../utils/api";

class Coins extends React.Component {
  state = {
    allCoins: {},
  };

  handleAllCoins = async () => {
    const newAllCoins = await getCoins();
    this.setState({ allCoins: newAllCoins });
    localStorage.setItem("allCoins", JSON.stringify(newAllCoins));
  };

  handleStorageData = (storageData) => {
    this.setState({ allCoins: storageData });
  };

  componentDidMount = () => {
    const storageData = JSON.parse(localStorage.getItem("allCoins")) || [];
    this.handleStorageData(storageData);
    this.handleAllCoins();
  };
  render() {
    console.log("$$$", this.state.allCoins);
    return (
      <div
        className="text"
        style={{ width: "95%", margin: "0 auto", padding: "0 10px" }}
      >
        <h1 className="text">Your overview</h1>
        <table
          className="color3"
          style={{
            margin: "0 auto",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>1h%</th>
              <th>24h%</th>
              <th>7d%</th>
              <th>24h Volume/Market Cap</th>
              <th>Circulating/Total Supply</th>
              <th>Last 7d</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.allCoins).map((key) => {
              return (
                <tr>
                  <td>this.state.allCoins[key].id</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Coins;
