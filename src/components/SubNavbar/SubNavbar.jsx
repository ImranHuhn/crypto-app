import { useState, useEffect, useContext } from "react";
import { getMarketData } from "utils/api";
import { abbreviateCurrency } from "utils/numberFormat";
import { ChevronTrendIcon } from "Icons";
import bitcoin from "assets/bitcoin.webp";
import ethereum from "assets/ethereum.webp";
import { CurrencyContext } from "../../context/CurrencyContext";

export const SubNavbar = () => {
  const [marketData, setMarketData] = useState(null);

  const currency = useContext(CurrencyContext);

  const {
    active_cryptocurrencies,
    markets,
    total_market_cap: market,
    market_cap_percentage,
    market_cap_change_percentage_24h_usd,
    total_volume: volume,
  } = marketData || {};
  const { usd } = market || {};
  const { btc: btcPercent, eth: ethPercent } = market_cap_percentage || {};
  const currencyFill = Math.round((volume?.usd / usd) * 100);
  const bitcoinPercentage = Math.round(btcPercent);
  const ethereumPercentage = Math.round(ethPercent);

  const marketVolumeCurrency = {
    USD: [market?.usd, volume?.usd],
    GBP: [market?.gbp, volume?.gbp],
    EUR: [market?.eur, volume?.eur],
    BTC: [market?.btc, volume?.btc],
    ETH: [market?.btc, volume?.btc],
  };

  const marketVolumePair = Object.entries(marketVolumeCurrency).filter((el) => {
    if (el[0] === currency) return el;
  });
  
  const volumeCurrency = marketVolumePair[0][1][1];
  const marketCurrency = marketVolumePair[0][1][0];

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
            number: marketCurrency,
            decimalPlaces: 2,
            currency: currency,
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
            number: volumeCurrency,
            decimalPlaces: 2,
            currency: currency,
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
