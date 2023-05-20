import React from "react";
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

    console.log(abbreviateNumber(usd));

    return (
      <>
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
          ${abbreviateNumber(usd)}{/* selected currency from nav for "total_market_cap" */}
        </div>
        <div>
          <ChevronIcon />
          {/* arrow up down with determine if value is positive or negative for "market_cap_change_percentage_24h_usd" */}
        </div>
        <h4 className="my-auto mx-1">&#9679;</h4>
        <div>
          ${abbreviateNumber(this.state.marketData?.total_volume?.usd)}
          {/* selected currency from nav for "total_volume" */}{" "}
          {/* bar = total volume / total market cap */}
        </div>
        <div>
          <div>
            <img className="w-6" src={bitcoin} alt="bitcoin" />
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
            <img className="w-6" src={ethereum} alt="ethereum" />
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
