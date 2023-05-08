import axios from "axios";

export const getCoins = async (page) => {
  const { data } = await axios(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  return data;
};

// export const getCoins = async (page) => {
//   try {
//     const { data } = await axios(
//       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
//     );
//     return data;
//   } catch (error) {
//     alert(error);
//   }
// };

export const getMarketData = async () => {
  try {
    const { data } = await axios(`https://api.coingecko.com/api/v3/global`);
    return data.data;
  } catch (error) {
    alert(error);
  }
};
