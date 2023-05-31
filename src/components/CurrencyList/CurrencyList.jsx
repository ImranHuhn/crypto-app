import { useState } from "react";
import { ChevronIcon, CheckMark } from "Icons";

export const CurrencyList = (props) => {
  const currencies = ["USD", "GBP", "EUR", "BTC", "ETH"];

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleItemClick = (e) => {
    props.getCurrency(e.target.value);
    setClicked(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="bg-[#ededed] dark:bg-[#2c2f36] text-black dark:text-white flex items-center justify-center h-11 rounded-lg border-none w-24 my-0 mx-3"
      >
        {props.currency}
        <div className="flex items-center w-5 h-5 rotate-180">
          <ChevronIcon />
        </div>
      </button>
      <ul
        className={`${
          clicked ? "" : "hidden"
        } w-24 absolute top-full mt-1 mx-3 bg-[#ededed] dark:bg-[#2c2f36] rounded-lg border border-slate-600`}
      >
        {currencies.map((el) => {
          return (
            <li
              key={el}
              className="text-black dark:text-white h-8 flex items-center justify-center"
            >
              <button
                onClick={handleItemClick}
                value={el}
                className="hover:bg-[#1a61c8] hover:text-white w-[90%] rounded-md flex justify-around"
              >
                {el === props.currency && (
                  <div className="w-2 h-2">
                    <CheckMark />
                  </div>
                )}
                {el}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
