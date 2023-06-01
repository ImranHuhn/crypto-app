import React from "react";
import { NavLink } from "react-router-dom";
import { SubNavbar, CurrencyList } from "components";
import { DarkThemeIcon, MagnifyIcon } from "Icons";

import { Outlet } from "react-router-dom";

export const Navbar = ({ handleThemeClick, currency, getCurrency }) => {
  return (
    <>
      <div className="bg-white dark:bg-[#191b1f] relative">
        <nav className="flex item-center justify-between h-20 w-[95%] my-0 mx-auto">
          <div className="flex items-center h-full">
            <div className="flex justify-center w-36 h-11 my-0 mx-2.5">
              <NavLink
                className="text-black dark:text-white flex justify-center items-center w-full h-full rounded-lg"
                to="/"
              >
                Coins
              </NavLink>
            </div>
            <div className="flex justify-center w-36 h-11 my-0 mx-2.5">
              <NavLink
                className="text-black dark:text-white flex justify-center items-center w-full h-full rounded-lg"
                to="/portfolio"
              >
                Portfolio
              </NavLink>
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
              <CurrencyList currency={currency} getCurrency={getCurrency} />
            </div>
            <button
              className="bg-[#ededed] dark:bg-[#2c2f36] h-11 w-10 rounded-lg border-none absolute right-0 my-0 mx-2"
              onClick={handleThemeClick}
            >
              <div className="fill-black dark:fill-white flex justify-center m-auto w-6">
                <DarkThemeIcon />
              </div>
            </button>
          </div>
        </nav>
        <div className="bg-white dark:bg-[#191b1f] text-black dark:text-white absolute left-1/2 -translate-x-1/2 w-1/2 rounded-b-xl h-10 flex justify-center items-center">
          <SubNavbar currency={currency} />
        </div>
      </div>
      <Outlet />
    </>
  );
};
