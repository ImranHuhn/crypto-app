import axios from "axios";

export const getCoins = async (order, page) => {
  console.log(order, page)
  try {
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${order.selection}&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    console.log(data)
    return data;
  } catch (error) {
    alert(error);
  }
};

export const getMarketData = async () => {
  try {
    const { data } = await axios(`https://api.coingecko.com/api/v3/global`);
    return data.data;
  } catch (error) {
    alert(error);
  }
};
