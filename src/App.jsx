import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Coins from "./pages/Coins";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.main};
  }
  div {
    color: ${(props) => props.theme.text}
  }
`;

const lightTheme = {
  main: "white",
  text: "black"
};

const darkTheme = {
  main: "black",
  text: "white"
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
      <ThemeProvider theme={this.state.on ? lightTheme : darkTheme }>
        <GlobalStyle/>
        <Router>
          <div>
            <Navbar handleClick={this.handleClick} on={this.state.on} />
            {/* <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Coins">Coins</Link>
                </li>
              </ul>
              <button onClick={this.handleClick}>{this.state.on ? "ON" : "OFF"}</button>
            </nav> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Coins" component={Coins} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
