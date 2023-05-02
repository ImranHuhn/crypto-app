import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCoins } from "../../utils/api";

class Landing extends React.Component {
  state = {
    allCoins: [],
    hasMore: true,
    page: 0,
  };

  handleInfiniteScroll = async () => {
    const newPage = this.state.page + 1;
    const newData = await getCoins(parseInt(newPage));
    const newAllCoins = [...this.state.allCoins, newData];
    if (this.state.allCoins.length - 1 >= this.props.totalCoins) {
      this.setState({ hasMore: false });
    }
    setTimeout(() => {
      this.setState({ allCoins: newAllCoins, page: newPage });
    }, 2000);
  };

  componentDidMount = async () => {
    this.handleInfiniteScroll();
  };
  render() {
    console.log(this.state);
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
              All coins have been loaded!
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
                {this.state.allCoins.map((item) => {
                  return (
                    <tr style={{ height: "100px" }} key={crypto.randomUUID()}>
                      <td>{item?.market_cap_rank || <Skeleton />}</td>
                      <td>
                        <img
                          src={item?.image || <Skeleton />}
                          style={{ width: "24px" }}
                        />
                        {item?.id || <Skeleton />} (
                        {item?.symbol || <Skeleton />})
                      </td>
                      <td>{item?.current_price || <Skeleton />}</td>
                      <td>
                        {item?.price_change_percentage_1h_in_currency || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        {item?.price_change_percentage_24h_in_currency || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        {item?.price_change_percentage_7d_in_currency || (
                          <Skeleton />
                        )}
                      </td>
                      <td>
                        {item?.total_volume || <Skeleton />}
                        {" / "}
                        {item?.market_cap || <Skeleton />}
                      </td>
                      <td>
                        {" "}
                        {item?.circulating_supply || <Skeleton />}
                        {" / "}
                        {item?.total_supply || <Skeleton />}
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

export default Landing;
