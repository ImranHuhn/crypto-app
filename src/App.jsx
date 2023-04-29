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
    margin: 0;
  }
  .text {
    color: ${(props) => props.theme.text};
  }

  .button {
    background-color: ${(props) => props.theme.secondary}
  }

  ::placeholder {
    color: ${(props) => props.theme.text};
  }

  :-ms-input-placeholder {
    color: ${(props) => props.theme.text};
  }

  ::-ms-input-placeholder {
    color: ${(props) => props.theme.text};
  }
`;

const lightTheme = {
  main: "#d3d3d3",
  secondary: "#d3d3d3",
  text: "#000",
};

const darkTheme = {
  main: "#1f2128",
  secondary: "#2c2f36",
  text: "#fff",
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
