import React from "react";
import { Link } from "react-router-dom";
import SubNavbar from "../SubNavbar";
import {
  DarkThemeIcon,
  MagnifyIcon,
  ChevronIcon,
  DollarIcon,
} from "../IconComponent";

export const Navbar = ({ on, handleClick }) => {
  return (
    <div className="third relative" $on={on}>
      <nav className="flex item-center justify-between h-20 w-[95%] my-0 mx-auto">
        <div className="flex items-center h-full">
          <div className="flex justify-center w-36 h-11 my-0 mx-2.5">
            <Link className="text button flex justify-center items-center w-full h-full rounded-lg" to="/">
              Coins
            </Link>
          </div>
          <div className="flex justify-center w-36 h-11 my-0 mx-2.5">
            <Link className="text button flex justify-center items-center w-full h-full rounded-lg" to="/portfolio">
              Portfolio
            </Link>
          </div>
        </div>
        <div className="flex items-center h-full">
          <div className="flex items-center relative h-full">
            <div className="text w-5 absolute left-2.5" $on={on}>
              <MagnifyIcon />
            </div>
            <input className="text second pl-9 h-11 rounded-lg border-none w-96	" $on={on} placeholder="Search..." />
            <button className="text button flex items-center justify-center h-11 rounded-lg border-none w-24 my-0 mx-3">
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
          <button className="button h-11 w-10 rounded-lg border-none absolute right-0 my-0 mx-2" onClick={handleClick}>
            <div className="fill flex justify-center m-auto w-6" $on={on}>
              <DarkThemeIcon />
            </div>
          </button>
        </div>
      </nav>
      <div className="text third absolute left-1/2 -translate-x-1/2 w-1/2 rounded-b-xl h-10 flex justify-center items-center">
        <SubNavbar />
      </div>
    </div>
  );
};
