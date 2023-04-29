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

  th,td {
    text-align: left;
  }

  .text {
    color: ${(props) => props.theme.text};
  }

  .color1 {
    background: ${(props) => props.theme.main};
  }

  .color2 {
    background-color: ${(props) => props.theme.second}
  }

  .color3 {
    background-color: ${(props) => props.theme.third}
  }

  .fill {
    fill: ${(props) => props.theme.fill}
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
  main: "#F2F2F2",
  second: "#F2F2F2",
  third: "#fff",
  text: "#000",
  fill: "#000",
};

const darkTheme = {
  main: "#1f2128",
  second: "#2c2f36",
  third: "#191b1f",
  text: "#fff",
  fill: "#fff",
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
