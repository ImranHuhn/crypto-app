import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCoins } from "../../utils/api";
import { UnsortIcon } from "../../components/IconComponent";
import {
  Container,
  ScrollMessage,
  TableWrapper,
  Table,
  TableRow,
} from "./Landing.styles";

class Landing extends React.Component {
  state = {
    allCoins: [],
    hasMore: true,
    page: 0,
    isLoading: false,
    // selection: "",
    sort: null,
  };

  sortingManager = () => {
    let newSort;
    switch (this.state.sort) {
      case null:
        newSort = true;
        break;
      case true:
        newSort = false;
        break;
      case false:
        newSort = null;
        break;
    }
    this.setState({ sort: newSort });
  };
  // sortingManager = (selection) => {
  //   switch (this.state.sort) {
  //     case null:
  //       this.setState({ sort: true, selection });
  //       break;
  //     case true:
  //       this.setState({ sort: false, selection });
  //       break;
  //     case false:
  //       this.setState({ sort: null, selection });
  //       break;
  //   }
  // };

  sortRank = () => {
    console.log("Sorting by rank");
    this.sortingManager();
    // this.sortingManager("rank");
  };

  sortName = () => {
    console.log("Sorting by name");
  };

  sortPrice = () => {
    console.log("Sorting by price");
  };

  sortOneHour = () => {
    console.log("Sorting by 1h");
  };

  sortTwentyFourHour = () => {
    console.log("Sorting by 24h");
  };

  sortSevenDays = () => {
    console.log("Sorting by 7d");
  };

  handleInfiniteScroll = async () => {
    this.setState({ isLoading: true });
    const newPage = this.state.page + 1;
    const newData = await getCoins(parseInt(newPage));
    const newAllCoins = [...this.state.allCoins, ...newData];
    if (this.state.allCoins.length - 1 >= this.props.totalCoins) {
      this.setState({ hasMore: false });
    }
    setTimeout(() => {
      this.setState({ allCoins: newAllCoins, page: newPage, isLoading: false });

      /////////////////////////////////////////////////////////////////
      localStorage.setItem("allCoins", JSON.stringify(newAllCoins));
      /////////////////////////////////////////////////////////////////
    }, 1500);
  };

  componentDidMount = async () => {
    this.handleInfiniteScroll();

    /////////////////////////////////////////////////////////////////
    const storage = JSON.parse(localStorage.getItem("allCoins")) || [];
    this.setState({ allCoins: storage });
    /////////////////////////////////////////////////////////////////
  };
  render() {
    // const hasCoins = !this.state.isLoading && this.state.allCoins;
    console.log(this.state.sort, " ", this.state.selection);

    let sortedAllCoins = this.state.allCoins.map((item) => item);

    sortedAllCoins.sort((a, b) => {
      switch (this.state.sort) {
        case true:
          return a.market_cap_rank - b.market_cap_rank;
        case false:
          return b.market_cap_rank - a.market_cap_rank;
        default:
          return sortedAllCoins;
      }
    });

    return (
      <Container>
        <InfiniteScroll
          dataLength={this.state.allCoins.length}
          next={this.handleInfiniteScroll}
          hasMore={this.state.hasMore}
          loader={<ScrollMessage className="text">Loading...</ScrollMessage>}
          endMessage={
            <ScrollMessage className="text">
              All coins have been loaded!
            </ScrollMessage>
          }
        >
          <TableWrapper className="text">
            <h1 className="text">Your Overview</h1>
            <Table className="third">
              <thead>
                <TableRow>
                  <th
                    onClick={this.sortRank}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>#</h3>
                    <div style={{ width: "20px", height: "20px" }}>
                      <UnsortIcon />
                    </div>
                  </th>
                  <th
                    onClick={this.sortName}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>Name</h3>
                    <div style={{ width: "20px", height: "20px" }}>
                      <UnsortIcon />
                    </div>
                  </th>
                  <th
                    onClick={this.sortPrice}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>Price</h3>
                    <div style={{ width: "20px", height: "20px" }}>
                      <UnsortIcon />
                    </div>
                  </th>
                  <th
                    onClick={this.sortOneHour}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>1h%</h3>
                    <div style={{ width: "20px", height: "20px" }}>
                      <UnsortIcon />
                    </div>
                  </th>
                  <th
                    onClick={this.sortTwentyFourHour}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>24h%</h3>
                    <div style={{ width: "20px", height: "20px" }}>
                      <UnsortIcon />
                    </div>
                  </th>
                  <th
                    onClick={this.sortSevenDays}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>7d%</h3>
                    <div style={{ width: "20px", height: "20px" }}>
                      <UnsortIcon />
                    </div>
                  </th>
                  <th
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>24h Volume/Market Cap</h3>
                  </th>
                  <th
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>Circulating/Total Supply</h3>
                  </th>
                  <th
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3>Last 7d</h3>
                  </th>
                </TableRow>
              </thead>
              <tbody>
                {sortedAllCoins.map((item) => {
                  return (
                    <TableRow key={crypto.randomUUID()}>
                      <td>{item?.market_cap_rank}</td>
                      <td>
                        <img src={item?.image} style={{ width: "24px" }} />
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
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </TableWrapper>
        </InfiniteScroll>
      </Container>
    );
  }
}

export default Landing;
