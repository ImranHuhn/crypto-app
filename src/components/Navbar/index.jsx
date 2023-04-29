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
              <StyledLink className="text color2" to="/">
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
              <StyledLink className="text color2" to="/portfolio">
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
              className="text"
                style={{
                  width: "20px",
                  position: "absolute",
                  left: "10px",
                }}
              />
              <input
              className="text color2"
                style={{
                  paddingLeft: "35px",
                  height: "44px",
                  borderRadius: "8px",
                  border: "none",
                  width: "400px",
                }}
                placeholder="Search..."
              />
              <button
                className="text color2"
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
              className="color2"
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
              className="fill"
                style={{
                  height: "18px",
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
