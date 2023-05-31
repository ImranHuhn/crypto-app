import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "components";
import { Coins, Portfolio } from "pages";
import { useLocalState } from "./hooks/useLocalState";

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

  return (
    <div className={on ? "dark" : ""}>
      <Router>
        <div className="bg-[#ededed] dark:bg-[#1f2128]">
          <Navbar
            handleThemeClick={handleClick}
            currency={currency}
            getCurrency={getCurrency}
          />
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => <Coins {...props} currency={currency} />}
            />
            <Route
              exact
              path="/portfolio"
              component={(props) => (
                <Portfolio {...props} currency={currency} />
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
