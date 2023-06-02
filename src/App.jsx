import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "components";
import { Coins, Portfolio } from "pages";
import { useLocalState } from "./hooks/useLocalState";

import { Context } from "./context";

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
        <Navbar
          handleThemeClick={handleClick}
          currency={currency}
          getCurrency={getCurrency}
        />
      ),
      children: [
        {
          index: true,
          element: <Coins currency={currency} />,
        },
        {
          path: "portfolio",
          element: <Portfolio currency={currency} />,
        },
      ],
    },
  ]);

  return (
    <div className={on ? "dark" : ""}>
      <div className="bg-[#ededed] dark:bg-[#1f2128]">
        <Context.Provider value={currency}>
          <RouterProvider router={router} />
        </Context.Provider>
      </div>
    </div>
  );
};
