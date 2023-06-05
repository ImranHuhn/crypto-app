import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getACoin } from "utils/api";

export const Coin = () => {
  const [coin, setCoin] = useState(null);

  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      const newCoin = await getACoin(params.coinId);
      setCoin(newCoin);
    };
    fetchCoin();
  }, [location]);

  console.log("state", coin);

  return (
    <div className="h-screen w-screen bg-[#FFC0CB] text-black dark:text-white">
      Coin page
    </div>
  );
};
