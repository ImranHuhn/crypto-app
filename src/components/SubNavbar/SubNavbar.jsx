import React from "react";
import { BarFill } from "./SubNavbar.styles";
import { getMarketData } from "utils/api";
import { abbreviateNumber } from "utils/calculations";
import { ChevronIcon } from "Icons";
import bitcoin from "assets/bitcoin.webp";
import ethereum from "assets/ethereum.webp";

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
    const { active_cryptocurrencies, markets, total_market_cap } =
      this.state.marketData || {};
    const { usd, btc, eth } = total_market_cap || {};
    const volume = this.state.marketData?.total_volume;
    const currencyFill = Math.round((volume?.usd / usd) * 100).toString();
    const bitcoinPercentage = Math.round(
      this.state.marketData?.market_cap_percentage.btc
    );
    const ethereumPercentage = Math.round(
      this.state.marketData?.market_cap_percentage.eth
    );

    return (
      <div className="flex justify-around w-4/5">
        <div className="flex">
          <div>Coins</div>
          <div>{active_cryptocurrencies}</div>
        </div>
        <div className="flex">
          <div>Exchange</div>
          <div>{markets}</div>
        </div>
        <h4 className="my-auto mx-1">&#9679;</h4>
        <div>
          ${abbreviateNumber(usd)}
          {/* selected currency from nav for "total_market_cap" */}
        </div>
        <div>
          <ChevronIcon />
          {/* arrow up down with determine if value is positive or negative for "market_cap_change_percentage_24h_usd" */}
        </div>
        <h4 className="my-auto mx-1">&#9679;</h4>
        <div className="flex items-center">
          <div>
            ${abbreviateNumber(this.state.marketData?.total_volume?.usd)}
          </div>
          {/* selected currency from nav for "total_volume" */}
          <div className="bg-[#2067cd] w-10 h-3 rounded-xl overflow-hidden">
            <BarFill
              barfill={currencyFill}
              className={`bg-white w-[${currencyFill}%] h-full rounded-xl`}
            ></BarFill>{" "}
            {/* using styled components here because tailwind is a bit buggy with the fill*/}
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img className="w-6" src={bitcoin} alt="bitcoin" />
          </div>
          <div>
            <div>{bitcoinPercentage}%</div>
          </div>
          <div className="bg-[#2067cd] w-10 h-3 rounded-xl overflow-hidden">
            <BarFill
              barfill={bitcoinPercentage}
              className={`bg-white h-full rounded-xl`}
            ></BarFill>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img className="w-6" src={ethereum} alt="ethereum" />
          </div>
          <div>
            <div>{ethereumPercentage}%</div>
          </div>
          <div className="bg-[#2067cd] w-10 h-3 rounded-xl overflow-hidden">
            <BarFill
              barfill={ethereumPercentage}
              className={`bg-white h-full rounded-xl`}
            ></BarFill>
          </div>
        </div>
      </div>
    );
  }
}
export default SubNavbar;
