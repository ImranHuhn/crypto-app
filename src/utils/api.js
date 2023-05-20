import axios from "axios";
import queryString from "query-string";

const base = import.meta.env.VITE_END_POINT;

export const getCoins = async (query) => {
  const newQuery = queryString.stringify(
    query,
    { skipNull: true },
    { parseBoolean: true }
  );

  try {
    const { data } = await axios(
      `${base}/coins/markets?${newQuery}&vs_currency=usd&per_page=50&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMarketData = async () => {
  try {
    const { data } = await axios(`${base}/global`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBitcoinData = async () => {
  try {
    const { data } = await axios(
      `${base}/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
