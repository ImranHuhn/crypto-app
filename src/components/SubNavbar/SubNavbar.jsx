import { useState, useEffect } from "react";
import { getMarketData } from "utils/api";
import { abbreviateCurrency } from "utils/numberFormat";
import { ChevronTrendIcon } from "Icons";
import bitcoin from "assets/bitcoin.webp";
import ethereum from "assets/ethereum.webp";

export const SubNavbar = (props) => {
  const [marketData, setMarketData] = useState(null);

  const {
    active_cryptocurrencies,
    markets,
    total_market_cap,
    market_cap_percentage,
    market_cap_change_percentage_24h_usd,
  } = marketData || {};
  const { usd } = total_market_cap || {};
  const { btc, eth } = market_cap_percentage || {};
  const volume = marketData?.total_volume;
  const currencyFill = Math.round((volume?.usd / usd) * 100);
  const bitcoinPercentage = Math.round(btc);
  const ethereumPercentage = Math.round(eth);

  const handleMarketData = async () => {
    const newData = await getMarketData();
    setMarketData(newData);
  };

  useEffect(() => {
    handleMarketData();
  }, []);

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
        <div className="px-1">
          {abbreviateCurrency({
            number: usd,
            decimalPlaces: 2,
            currency: props.currency,
          })}
        </div>
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
      <h4 className="my-auto mx-1">&#9679;</h4>
      <div className="flex items-center">
        <div>
          {abbreviateCurrency({
            number: volume?.usd,
            decimalPlaces: 2,
            currency: props.currency,
          })}
        </div>
        <div className="bg-[#2067cd] w-10 h-3 rounded-xl overflow-hidden">
          <div
            style={{ width: `${currencyFill || ""}%` }}
            className="bg-black dark:bg-white h-full rounded-xl"
          ></div>{" "}
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
          <div
            style={{ width: `${bitcoinPercentage || ""}%` }}
            className="bg-black dark:bg-white h-full rounded-xl"
          ></div>
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
          <div
            style={{ width: `${ethereumPercentage || ""}%` }}
            className="bg-black dark:bg-white h-full rounded-xl"
          ></div>
        </div>
      </div>
    </div>
  );
};
