import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Coins from "./pages/Coins";
import Portfolio from "./pages/Portfolio";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    font-family: sans-serif;
  }
  body {
    background: ${(props) => props.theme.main};
  }
  .text {
    color: ${(props) => props.theme.text}
  }
`;

const lightTheme = {
  main: "white",
  text: "black",
};

const darkTheme = {
  main: "black",
  text: "white",
};
class App extends React.Component {
  state = {
    on: false,
  };

  handleClick = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.on ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router>
          <div>
            <Navbar handleClick={this.handleClick} on={this.state.on} />
            <Switch>
              <Route exact path="/" component={Coins} />
              <Route exact path="/portfolio" component={Portfolio} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
