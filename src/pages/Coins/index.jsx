import React from "react";

class Coins extends React.Component {
  render() {
    return (
      <div className="text" style={{ width:"95%", margin:"0 auto", padding:"0 10px"}}>
        <h1>Your overview</h1>
        <table style={{margin:"0 auto", width:"100%", backgroundColor:"#191b1f", borderRadius:"10px"}}>
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
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Coins;
