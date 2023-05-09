import axios from "axios";

export const getCoins = async (order, page) => {
  let newOrder;
  // if (order.sort === true) {
  //   newOrder = order.selection.concat("_asc");
  // } else if (order.sort === false) {
  //   newOrder = order.selection.concat("_desc");
  // } else {
  //   newOrder = "market_cap_desc";
  // }

  switch (order.sort) {
    case true:
      newOrder = order.selection.concat("_asc");
      break;
    case false:
      newOrder = order.selection.concat("_desc");
      break;
    case null:
      newOrder = "market_cap_desc";
  }

  console.log(order, page);
  console.log("///////order", order);
  console.log("///////newOrder", newOrder);

  try {
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${newOrder}&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    console.log(data);
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
