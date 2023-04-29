import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  DarkThemeIcon,
  MagnifyIcon,
  ChevronIcon,
  DollarIcon,
} from "../IconComponent";

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  height: 100%;
`;
class Navbar extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: `${this.props.on ? "#fff" : "#191b1f"}`,
          position: "relative",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
            width: "95%",
            margin: "0 auto",
          }}
        >
          <div
            style={{ display: "flex", height: "100%", alignItems: "center" }}
          >
            <div
              style={{
                width: "135px",
                display: "flex",
                justifyContent: "center",
                height: "44px",
                margin: "0 10px",
              }}
            >
              <StyledLink className="text button" to="/">
                Coins
              </StyledLink>
            </div>
            <div
              style={{
                width: "135px",
                display: "flex",
                justifyContent: "center",
                height: "44px",
                margin: "0 10px",
              }}
            >
              <StyledLink className="text button" to="/portfolio">
                Portfolio
              </StyledLink>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
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
                style={{
                  width: "20px",
                  position: "absolute",
                  color: `${this.props.on ? "#000" : "#fff"}`,
                  left: "10px",
                }}
              />
              <input
                style={{
                  paddingLeft: "35px",
                  height: "44px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: `${this.props.on ? "#d3d3d3" : "#2c2f36"}`,
                  color: `${this.props.on ? "#000" : "#fff"}`,
                  width: "400px",
                }}
                placeholder="Search..."
              />
              <button
                className="text button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "44px",
                  borderRadius: "8px",
                  border: "none",
                  margin: "0 10px",
                  width: "100px",
                }}
              >
                <DollarIcon style={{ width: "24px" }} />
                USD
                <ChevronIcon style={{ width: "20px" }} />
              </button>
              <ul style={{ display: "none" }}>
                <li>USD</li>
                <li>GBP</li>
                <li>EUR</li>
                <li>BTC</li>
                <li>ETH</li>
              </ul>
            </div>
            <button
              className="button"
              style={{
                height: "44px",
                width: "40px",
                borderRadius: "8px",
                border: "none",
                position: "absolute",
                right: "0",
                margin: "0 8px",
              }}
              onClick={this.props.handleClick}
            >
              <DarkThemeIcon
                style={{
                  height: "18px",
                  fill: `${this.props.on ? "#000" : "#fff"}`,
                }}
              />
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
