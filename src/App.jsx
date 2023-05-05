import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { getMarketData } from "./utils/api";
import { GlobalStyle, lightTheme, darkTheme } from "./App.styles";
import { Navbar } from "./components/Navbar";
import Landing from "./pages/Landing";
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
    const themeSetting = !this.state.on;
    this.setState({ on: themeSetting });
    localStorage.setItem("themeSetting", JSON.stringify(themeSetting));
  };

  componentDidMount = () => {
    this.handleMarketData();
    const storedTheme = JSON.parse(localStorage.getItem("themeSetting"));
    this.setState({ on: storedTheme });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.on ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router>
          <div>
            <Navbar
              handleClick={this.handleClick}
              on={this.state.on}
              totalCoins={this.state.marketData?.active_cryptocurrencies}
              totalExchanges={this.state.marketData?.markets}
              marketCap={this.state.marketData?.total_market_cap}
              marketVolume={this.state.marketData?.total_volume}
            />
            <Switch>
              <Route
                exact
                path="/"
                component={(props) => (
                  <Landing
                    {...props}
                    totalCoins={this.state.marketData?.active_cryptocurrencies} // need this for handleInfiniteScroll function in coins page
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
