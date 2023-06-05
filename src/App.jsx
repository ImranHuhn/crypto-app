import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "components";
import { Coins, Coin, Portfolio } from "pages";
import { useLocalState } from "./hooks/useLocalState";
import { CurrencyContext } from "./context/CurrencyContext";

import { getACoin } from "utils/api";

export const App = () => {
  const [on, setOn] = useLocalState("themeSetting", false);
  const [currency, setCurrency] = useLocalState("currency", "USD");

  const getCurrency = (currency) => {
    setCurrency(currency);
  };

  const handleClick = () => {
    const themeSetting = !on;
    setOn(themeSetting);
  };

  useEffect(() => {
    setOn(on);
    setCurrency(currency);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navbar handleThemeClick={handleClick} getCurrency={getCurrency} />
      ),
      children: [
        {
          index: true,
          element: <Coins />,
        },
        {
          path: "coin/:coinId",
          element: <Coin />,
          loader: ({ params }) => {
            return params.coinId;
          },
        },
        {
          path: "portfolio",
          element: <Portfolio />,
        },
      ],
    },
  ]);

  return (
    <div className={on ? "dark" : ""}>
      <div className="bg-[#ededed] dark:bg-[#1f2128]">
        <CurrencyContext.Provider value={currency}>
          <RouterProvider router={router} />
        </CurrencyContext.Provider>
      </div>
    </div>
  );
};
