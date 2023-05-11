import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, lightTheme, darkTheme } from "./App.styles";
import Navbar from "./components/Navbar";
import Coins from "./pages/Coins";
import Portfolio from "./pages/Portfolio";

class App extends React.Component {
  state = {
    on: false,
  };

  handleClick = () => {
    const { on } = this.state;
    const themeSetting = !on;
    this.setState({ on: themeSetting });
    localStorage.setItem("themeSetting", JSON.stringify(themeSetting));
  };

  componentDidMount = () => {
    const storedTheme = JSON.parse(localStorage.getItem("themeSetting"));
    this.setState({ on: storedTheme });
  };

  render() {
    const { on } = this.state;
    return (
      <ThemeProvider theme={this.state.on ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router>
          <div>
            <Navbar handleClick={this.handleClick} on={on} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/portfolio" component={Portfolio} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
