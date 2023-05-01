import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCoins } from "../../utils/api";

let page = 0;
class Coins extends React.Component {
  state = {
    allCoins: [],
    hasMore: true,
  };

  handleInfiniteScroll = async () => {
    const newData = await getCoins(parseInt(page));
    const newAllCoins = [...this.state.allCoins, ...newData];
    if (this.state.allCoins.length - 1 >= 50) {
      this.setState({ hasMore: false });
    }
    setTimeout(() => {
      this.setState({ allCoins: newAllCoins });
    }, 1500);
    page++;
  };

  componentDidMount = async () => {
    this.handleInfiniteScroll();
  };
  render() {
    return (
      <div style={{ overflow: "auto" }}>
        <InfiniteScroll
          dataLength={this.state.allCoins.length}
          next={this.handleInfiniteScroll}
          hasMore={this.state.hasMore}
          loader={
            <h4 style={{ textAlign: "center" }} className="text">
              Loading...
            </h4>
          }
          endMessage={
            <h1 style={{ textAlign: "center" }} className="text">
              All data have been loaded!
            </h1>
          }
        >
          <div
            className="text"
            style={{
              width: "95%",
              margin: "0 auto",
              padding: "0 10px",
              overflow: "auto",
            }}
          >
            <h1 className="text">Your Overview</h1>
            <table
              className="third"
              style={{
                margin: "0 auto",
                width: "100%",
                borderRadius: "10px",
                padding: "0 25px",
                height: "100vh",
              }}
            >
              <thead>
                <tr style={{ height: "100px" }}>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>1h%</th>
                  <th>24h%</th>
                  <th>7d%</th>
                  <th>24h Volume/Market Cap</th>
                  <th>Circulating/Total Supply</th>
                  <th>Last 7d</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.allCoins).map((key) => {
                  return (
                    <tr style={{ height: "100px" }} key={crypto.randomUUID()}>
                      <td>
                        {this.state.allCoins[key]?.market_cap_rank || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        <img
                          src={this.state.allCoins[key]?.image || <Skeleton />}
                          style={{ width: "24px" }}
                        />
                        {this.state.allCoins[key]?.id || <Skeleton />} (
                        {this.state.allCoins[key]?.symbol || <Skeleton />})
                      </td>
                      <td>
                        {this.state.allCoins[key]?.current_price || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        {this.state.allCoins[key]
                          ?.price_change_percentage_1h_in_currency || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        {this.state.allCoins[key]
                          ?.price_change_percentage_24h_in_currency || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        {this.state.allCoins[key]
                          ?.price_change_percentage_7d_in_currency || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        {this.state.allCoins[key]?.total_volume || <Skeleton />}
                        {" / "}
                        {this.state.allCoins[key]?.market_cap || <Skeleton />}
                      </td>
                      <td>
                        {" "}
                        {this.state.allCoins[key]?.circulating_supply || (
                          <Skeleton />
                        )}
                        {" / "}
                        {this.state.allCoins[key]?.total_supply || <Skeleton />}
                      </td>
                      <td>9</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Coins;
