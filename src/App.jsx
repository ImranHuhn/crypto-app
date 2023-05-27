import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "components";
import { Coins, Portfolio } from "pages";

class App extends React.Component {
  state = {
    on: false,
    currency: "USD",
  };

  getCurrency = (currency) => {
    this.setState({ currency });
    localStorage.setItem("currency", JSON.stringify(currency));
  };

  handleClick = () => {
    const { on } = this.state;
    const themeSetting = !on;
    this.setState({ on: themeSetting });
    localStorage.setItem("themeSetting", JSON.stringify(themeSetting));
  };

  componentDidMount = () => {
    const storedTheme = JSON.parse(localStorage.getItem("themeSetting"));
    const currency = JSON.parse(localStorage.getItem("currency")) || "USD";
    this.setState({ on: storedTheme, currency });
  };

  render() {
    const { on } = this.state;
    return (
      <div className={on ? "dark" : ""}>
        <Router>
          <div className="bg-[#ededed] dark:bg-[#1f2128]">
            <Navbar
              handleThemeClick={this.handleClick}
              currency={this.state.currency}
              getCurrency={this.getCurrency}
            />
            <Switch>
              <Route
                exact
                path="/"
                component={(props) => (
                  <Coins {...props} currency={this.state.currency} />
                )}
              />
              <Route
                exact
                path="/portfolio"
                component={(props) => (
                  <Portfolio {...props} currency={this.state.currency} />
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
