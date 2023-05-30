import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "components";
import { Coins, Portfolio } from "pages";

export const App = () => {
  const [on, setOn] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const getCurrency = (currency) => {
    setCurrency(currency);
    localStorage.setItem("currency", JSON.stringify(currency));
  };

  const handleClick = () => {
    const themeSetting = !on;
    setOn(themeSetting);
    localStorage.setItem("themeSetting", JSON.stringify(themeSetting));
  };

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("themeSetting"));
    const currency = JSON.parse(localStorage.getItem("currency")) || "USD";
    setOn(storedTheme);
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

// class App extends React.Component {
//   state = {
//     on: false,
//     currency: "USD",
//   };

//   getCurrency = (currency) => {
//     this.setState({ currency });
//     localStorage.setItem("currency", JSON.stringify(currency));
//   };

//   handleClick = () => {
//     const { on } = this.state;
//     const themeSetting = !on;
//     this.setState({ on: themeSetting });
//     localStorage.setItem("themeSetting", JSON.stringify(themeSetting));
//   };

//   componentDidMount = () => {
//     const storedTheme = JSON.parse(localStorage.getItem("themeSetting"));
//     const currency = JSON.parse(localStorage.getItem("currency")) || "USD";
//     this.setState({ on: storedTheme, currency });
//   };

//   render() {
//     const { on } = this.state;
//     return (
//       <div className={on ? "dark" : ""}>
//         <Router>
//           <div className="bg-[#ededed] dark:bg-[#1f2128]">
//             <Navbar
//               handleThemeClick={this.handleClick}
//               currency={this.state.currency}
//               getCurrency={this.getCurrency}
//             />
//             <Switch>
//               <Route
//                 exact
//                 path="/"
//                 component={(props) => (
//                   <Coins {...props} currency={this.state.currency} />
//                 )}
//               />
//               <Route
//                 exact
//                 path="/portfolio"
//                 component={(props) => (
//                   <Portfolio {...props} currency={this.state.currency} />
//                 )}
//               />
//             </Switch>
//           </div>
//         </Router>
//       </div>
//     );
//   }
// }

// export default App;
