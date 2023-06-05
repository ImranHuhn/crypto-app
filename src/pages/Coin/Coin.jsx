import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export const Coin = () => {
  const location = useLocation();

  let params = useParams();
  console.log(params);

  useEffect(() => {
    console.log("change");
  }, [location]);

  return (
    <div className="h-screen w-screen bg-[#FFC0CB] text-black dark:text-white">
      Coin page
    </div>
  );
};
