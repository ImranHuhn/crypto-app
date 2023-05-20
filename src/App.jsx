import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { ThemeProvider } from "styled-components";
// import { GlobalStyle, lightTheme, darkTheme } from "./App.styles";
import { GlobalStyle } from "./App.styles";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
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
    // console.log("on", this.state.on)

    const { on } = this.state;
    return (
      <div className={on ? "dark" : ""}>
        {/* <ThemeProvider theme={on ? lightTheme : darkTheme}> */}
        <GlobalStyle />
        <Router>
          <div>
            <Navbar handleClick={this.handleClick} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/portfolio" component={Portfolio} />
            </Switch>
          </div>
        </Router>
        {/* </ThemeProvider> */}
      </div>
    );
  }
}

export default App;
