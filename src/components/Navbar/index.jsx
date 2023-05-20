import React from "react";
import { Link } from "react-router-dom";
import SubNavbar from "components/SubNavbar";
import {
  DarkThemeIcon,
  MagnifyIcon,
  ChevronIcon,
  DollarIcon,
} from "components/IconComponent";

export const Navbar = ({ handleClick }) => {
  return (
    <div className="bg-white dark:bg-[#191b1f] relative">
      <nav className="flex item-center justify-between h-20 w-[95%] my-0 mx-auto">
        <div className="flex items-center h-full">
          <div className="flex justify-center w-36 h-11 my-0 mx-2.5">
            <Link
              className="bg-[#ededed] dark:bg-[#2c2f36] text-black dark:text-white flex justify-center items-center w-full h-full rounded-lg"
              to="/"
            >
              Coins
            </Link>
          </div>
          <div className="flex justify-center w-36 h-11 my-0 mx-2.5">
            <Link
              className="bg-[#ededed] dark:bg-[#2c2f36] text-black dark:text-white flex justify-center items-center w-full h-full rounded-lg"
              to="/portfolio"
            >
              Portfolio
            </Link>
          </div>
        </div>
        <div className="flex items-center h-full">
          <div className="flex items-center relative h-full">
            <div className="text-black dark:text-white w-5 absolute left-2.5">
              <MagnifyIcon />
            </div>
            <input
              className="text-black dark:text-white bg-[#ededed] dark:bg-[#2c2f36] pl-9 h-11 rounded-lg border-none w-96	"
              placeholder="Search..."
            />
            <button className="bg-[#ededed] dark:bg-[#2c2f36] text-black dark:text-white flex items-center justify-center h-11 rounded-lg border-none w-24 my-0 mx-3">
              <div className="w-6">
                <DollarIcon />
              </div>
              USD
              <div className="flex items-center w-5 rotate-180">
                <ChevronIcon />
              </div>
            </button>
            <ul className="hidden">
              <li>USD</li>
              <li>GBP</li>
              <li>EUR</li>
              <li>BTC</li>
              <li>ETH</li>
            </ul>
          </div>
          <button
            className="bg-[#ededed] dark:bg-[#2c2f36] h-11 w-10 rounded-lg border-none absolute right-0 my-0 mx-2"
            onClick={handleClick}
          >
            <div className="fill-black dark:fill-white flex justify-center m-auto w-6">
              <DarkThemeIcon />
            </div>
          </button>
        </div>
      </nav>
      <div className="bg-white dark:bg-[#191b1f] text-black dark:text-white absolute left-1/2 -translate-x-1/2 w-1/2 rounded-b-xl h-10 flex justify-center items-center">
        <SubNavbar />
      </div>
    </div>
  );
};
