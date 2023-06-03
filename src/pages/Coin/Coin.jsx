import {useEffect} from "react";
import { useLocation } from 'react-router-dom';

export const Coin = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location)
  }, [location]);
  return (
    <div className="h-screen w-screen bg-[#FFC0CB] text-black dark:text-white">
      Coin page
    </div>
  );
};
