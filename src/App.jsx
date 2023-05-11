import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { getMarketData } from "./utils/api";
import { GlobalStyle, lightTheme, darkTheme } from "./App.styles";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

class App extends React.Component {
  state = {
    on: false,
    marketData: null,
  };

  handleMarketData = async () => {
    const newData = await getMarketData();
    this.setState({
      marketData: newData,
    });
  };

  handleClick = () => {
    const { on } = this.state;
    const themeSetting = !on;
    this.setState({ on: themeSetting });
    localStorage.setItem("themeSetting", JSON.stringify(themeSetting));
  };

  componentDidMount = () => {
    this.handleMarketData();
    const storedTheme = JSON.parse(localStorage.getItem("themeSetting"));
    this.setState({ on: storedTheme });
  };

  render() {
    const { on } = this.state;
    const { active_cryptocurrencies, markets, total_market_cap, total_volume } =
      this.state.marketData || {};
    return (
      <ThemeProvider theme={on ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router>
          <div>
            <Navbar
              handleClick={this.handleClick}
              on={on}
              totalCoins={active_cryptocurrencies}
              totalExchanges={markets}
              marketCap={total_market_cap}
              marketVolume={total_volume}
            />
            <Switch>
              <Route
                exact
                path="/"
                component={(props) => (
                  <Home
                    {...props}
                    totalCoins={active_cryptocurrencies} // need this for handleInfiniteScroll function in coins page
                  />
                )}
              />
              <Route exact path="/portfolio" component={Portfolio} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
