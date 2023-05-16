import React from "react";
import { Wrapper, Dot, Image } from "./SubNavbar.styles";
import { getMarketData } from "../../utils/api";
import { ChevronIcon } from "../IconComponent";
import bitcoin from "../../assets/bitcoin.webp";
import ethereum from "../../assets/ethereum.webp";

class SubNavbar extends React.Component {
  state = {
    marketData: null,
  };

  handleMarketData = async () => {
    const newData = await getMarketData();
    this.setState({
      marketData: newData,
    });
  };

  componentDidMount = () => {
    this.handleMarketData();
  };

  render() {
    const { active_cryptocurrencies, markets, total_market_cap } = this.state.marketData || {};
    const { usd, btc, eth } = total_market_cap || {};
    return (
      <>
        <Wrapper>
          <div>Coins</div>
          <div>{active_cryptocurrencies}</div>
        </Wrapper>
        <Wrapper>
          <div>Exchange</div>
          <div>{markets}</div>
        </Wrapper>
        <Dot>&#9679;</Dot>
        <div>
          ${usd}T{/* selected currency from nav for "total_market_cap" */}
        </div>
        <div>
          <ChevronIcon />
          {/* arrow up down with determine if value is positive or negative for "market_cap_change_percentage_24h_usd" */}
        </div>
        <Dot>&#9679;</Dot>
        <div>
          ${this.state.marketData?.total_volume?.usd}B
          {/* selected currency from nav for "total_volume" */}{" "}
          {/* bar = total volume / total market cap */}
        </div>
        <div>
          <div>
            <Image src={bitcoin} alt="bitcoin" />
          </div>
          <div>
            <div>{btc}%</div>
            <div>
              <div>bar</div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Image src={ethereum} alt="ethereum" />
          </div>
          <div>
            <div>{eth}%</div>
            <div>
              <div>bar</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default SubNavbar;
