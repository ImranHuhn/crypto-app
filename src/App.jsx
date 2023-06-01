import { useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  // BrowserRouter,
  // Route,
  // Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "components";
import { Coins, Portfolio } from "pages";
import { useLocalState } from "./hooks/useLocalState";

import { Test } from "../src/pages/Test";

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
    // {
    //   path: "/",
    //   element: (
    //     <Navbar
    //       handleThemeClick={handleClick}
    //       currency={currency}
    //       getCurrency={getCurrency}
    //     />
    //   ),
    //   children: [{ index: true, element: <Test /> }],
    // },
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
      <RouterProvider
        router={router}
        handleThemeClick={handleClick}
        currency={currency}
        getCurrency={getCurrency}
      />
      {/* <BrowserRouter>
        <div className="bg-[#ededed] dark:bg-[#1f2128]">
          <Navbar
            handleThemeClick={handleClick}
            currency={currency}
            getCurrency={getCurrency}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={(props) => <Coins {...props} currency={currency} />}
            />
            <Route
              exact
              path="/portfolio"
              element={(props) => (
                <Portfolio {...props} currency={currency} />
              )}
            />
          </Routes>
        </div>
      </BrowserRouter> */}
    </div>
  );
};
