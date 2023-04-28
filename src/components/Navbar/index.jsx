import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DarkTheme, MagnifyIcon, ChevronDown } from "../IconComponent";

const StyledLink = styled(Link)`
  background-color: red;
  margin: auto 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  height: 100%;
`;

class Navbar extends React.Component {
  render() {
    return (
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <div style={{ display: "flex", height: "100%" }}>
          <div
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <StyledLink className="text" to="/">
              Coins
            </StyledLink>
          </div>
          <div
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StyledLink className="text" to="/portfolio">
              Portfolio
            </StyledLink>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div
            className="text"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              height: "100%",
            }}
          >
            <MagnifyIcon
              style={{ width: "20px", position: "absolute", color: "black" }}
            />
            <input
              style={{ paddingLeft: "20px", height: "100%", borderRadius: "8px" }}
              placeholder="Search..."
            />
          </div>
          <div style={{ height: "100%" }}>
            <button
              style={{ display: "flex", alignItems: "center", height: "100%", borderRadius: "8px" }}
            >
              ($) USD
              <ChevronDown style={{ width: "20px" }} />
            </button>
            <ul style={{ display: "none" }}>
              <li>USD</li>
              <li>GBP</li>
              <li>EUR</li>
              <li>BTC</li>
              <li>ETH</li>
            </ul>
          </div>
          <div style={{ height: "100%" }}>
            <button
              style={{ height: "100%", width: "40px", borderRadius:"8px" }}
              onClick={this.props.handleClick}
            >
              {/* {this.props.on ? "Icon ON" : "Icon OFF"} */}
              <DarkTheme style={{ height: "18px" }} />
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
