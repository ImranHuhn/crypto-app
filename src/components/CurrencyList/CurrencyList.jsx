import React from "react";
import { ChevronIcon, CheckMark } from "Icons";

class CurrencyList extends React.Component {
  state = {
    isClicked: false,
    currencies: ["USD", "GBP", "EUR", "BTC", "ETH"],
  };

  handleClick = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  handleItemClick = (e) => {
    this.props.getCurrency(e.target.value);
    this.setState({ isClicked: false });
  };

  render() {
    return (
      <div className="relative">
        <button
          onClick={this.handleClick}
          className="bg-[#ededed] dark:bg-[#2c2f36] text-black dark:text-white flex items-center justify-center h-11 rounded-lg border-none w-24 my-0 mx-3"
        >
          {this.props.currency}
          <div className="flex items-center w-5 h-5 rotate-180">
            <ChevronIcon />
          </div>
        </button>
        <ul
          className={`${
            this.state.isClicked ? "" : "hidden"
          } w-24 absolute top-full mt-1 mx-3 bg-[#ededed] dark:bg-[#2c2f36] rounded-lg border border-slate-600`}
        >
          {this.state.currencies.map((el) => {
            return (
              <li
                key={el}
                className="text-black dark:text-white h-8 flex items-center justify-center"
              >
                <button
                  onClick={this.handleItemClick}
                  value={el}
                  className="hover:bg-[#1a61c8] hover:text-white w-[90%] rounded-md flex justify-around"
                >
                  {el === this.props.currency && (
                    <div className="w-2 h-2">
                      <CheckMark />
                    </div>
                  )}
                  {el}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CurrencyList;
