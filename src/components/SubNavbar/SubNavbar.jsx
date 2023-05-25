import React from "react";
import { BarFill } from "./SubNavbar.styles";
import { getMarketData } from "utils/api";
import { abbreviateDollar } from "utils/numberFormat";
import { ChevronIcon, ChevronTrendIcon } from "Icons";
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
    const {
      active_cryptocurrencies,
      markets,
      total_market_cap,
      market_cap_percentage,
      market_cap_change_percentage_24h_usd,
    } = this.state.marketData || {};
    const { usd } = total_market_cap || {};
    const { btc, eth } = market_cap_percentage || {};
    const volume = this.state.marketData?.total_volume;
    const currencyFill = Math.round((volume?.usd / usd) * 100);
    const bitcoinPercentage = Math.round(btc);
    const ethereumPercentage = Math.round(eth);

    return (
      <div className="flex justify-around w-4/5">
        <div className="flex">
          <div>Coins</div>
          <div className="mx-2 font-bold">{active_cryptocurrencies}</div>
        </div>
        <div className="flex">
          <div>Exchange</div>
          <div className="mx-2 font-bold">{markets}</div>
        </div>
        <h4 className="my-auto mx-1">&#9679;</h4>
        <div className="flex items-center">
          <div className="px-1">{abbreviateDollar(usd, 2)}</div>
          <div
            className={`w-5 h-5 ${
              market_cap_change_percentage_24h_usd < 0 ? `rotate-180` : ""
            }`}
          >
            <ChevronTrendIcon
              filler={
                market_cap_change_percentage_24h_usd < 0 ? "#e5113c" : "#00f629"
              }
            />
          </div>
        </div>
        {/* <div className="flex items-center">
        </div> */}
        <h4 className="my-auto mx-1">&#9679;</h4>
        <div className="flex items-center">
          <div>{abbreviateDollar(volume?.usd, 2)}</div>
          {/* selected currency from nav for "total_volume" */}
          <div className="bg-[#2067cd] w-10 h-3 rounded-xl overflow-hidden">
            <BarFill
              barfill={currencyFill || ""}
              className={`bg-white h-full rounded-xl`}
            ></BarFill>{" "}
            {/* using styled components here because tailwind is a bit buggy with the fill width "w-[${currencyFill}%]" */}
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
              barfill={bitcoinPercentage || ""}
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
              barfill={ethereumPercentage || ""}
              className={`bg-white h-full rounded-xl`}
            ></BarFill>
          </div>
        </div>
      </div>
    );
  }
}
export default SubNavbar;
