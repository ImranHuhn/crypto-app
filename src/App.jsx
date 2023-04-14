import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import Coins from "./pages/Coins";



class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Coins">Coins</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Coins" component={Coins}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;