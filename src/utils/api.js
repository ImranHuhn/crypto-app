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
      `${base}/coins/markets?${newQuery}&per_page=50&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    return data;
  } catch (error) {
    console.log(error);
    return { name: "error", errorMessage: error };
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

export const getBitcoinData = async (query) => {
  const newQuery = queryString.stringify(query);
  try {
    const { data } = await axios(
      `${base}/coins/bitcoin/market_chart?${newQuery}&days=180&interval=daily`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getACoin = async (coinId) => {
  try {
    const { data } = await axios(
      `${base}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
    );
    return data;
  } catch (error) {
    console.log(error);
    return { name: "error", errorMessage: error };
  }
};
