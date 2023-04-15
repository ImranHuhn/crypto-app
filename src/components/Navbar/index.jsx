import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as ReactTheme} from "../../assets/theme.svg"

class Navbar extends React.Component {
  render() {
    return (
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ul style={{ display: "flex" }}>
          <li>
            <Link className="text" to="/">Coins</Link>
          </li>
          <li>
            <Link className="text" to="/portfolio">Portfolio</Link>
          </li>
        </ul>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="text">
            MagnifyIcon
            <input placeholder="Search..." />
          </div>
          <div>
            <ReactTheme/>
            <button>(Currency Icon) Currency</button>
            <ul style={{ display: "none" }}>
              <li>USD</li>
              <li>GBP</li>
              <li>EUR</li>
              <li>BTC</li>
              <li>ETH</li>
            </ul>
          </div>
          <div>
            <button onClick={this.props.handleClick}>
              {this.props.on ? "Icon ON" : "Icon OFF"}
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
