import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCoins } from "../../utils/api";
import { SortIcon } from "../../components/IconComponent";
import {
  Container,
  ScrollMessage,
  TableWrapper,
  Table,
  HeadTableRow,
  BodyTableRow,
} from "./Landing.styles";

class Landing extends React.Component {
  state = {
    allCoins: [],
    hasMore: true,
    page: 0,
    isLoading: false,
    selection: "",
    sort: null,
  };

  sortingManager = (selection) => {
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
    this.setState({ sort: newSort, selection });
  };
  // sortingManager = () => {
  //   let newSort;
  //   switch (this.state.sort) {
  //     case null:
  //       newSort = true;
  //       break;
  //     case true:
  //       newSort = false;
  //       break;
  //     case false:
  //       newSort = null;
  //       break;
  //   }
  //   this.setState({ sort: newSort });
  // };

  sortRank = () => {
    console.log("Sorting by rank");
    // this.sortingManager();
    this.sortingManager("rank");
  };

  sortName = () => {
    console.log("Sorting by name");
    this.sortingManager("name");
  };

  sortPrice = () => {
    console.log("Sorting by price");
    this.sortingManager("price");
  };

  sortOneHour = () => {
    console.log("Sorting by 1h");
    this.sortingManager("one-hour");
  };

  sortTwentyFourHour = () => {
    console.log("Sorting by 24h");
    this.sortingManager("twentyfour-hours");
  };

  sortSevenDays = () => {
    console.log("Sorting by 7d");
    this.sortingManager("seven-days");
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
      if (this.state.allCoins.length < 100) {
        localStorage.setItem("allCoins", JSON.stringify(newAllCoins));
      }
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
    console.log(this.state);
    console.log(this.state.sort, " ", this.state.selection);

    let sortedAllCoins = this.state.allCoins.map((item) => item);

    sortedAllCoins.sort((a, b) => {
      if (this.state.sort === true && this.state.selection === "rank") {
        return a.market_cap_rank - b.market_cap_rank;
      } else if (this.state.sort === false && this.state.selection === "rank") {
        return b.market_cap_rank - a.market_cap_rank;
      } else if (this.state.sort === true && this.state.selection === "name") {
        return a.id.localeCompare(b.id);
      } else if (this.state.sort === false && this.state.selection === "name") {
        return b.id.localeCompare(a.id);
      } else if (this.state.sort === true && this.state.selection === "price") {
        return a.current_price - b.current_price;
      } else if (
        this.state.sort === false &&
        this.state.selection === "price"
      ) {
        return b.current_price - a.current_price;
      } else if (
        this.state.sort === true &&
        this.state.selection === "one-hour"
      ) {
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      } else if (
        this.state.sort === false &&
        this.state.selection === "one-hour"
      ) {
        return (
          b.price_change_percentage_1h_in_currency -
          a.price_change_percentage_1h_in_currency
        );
      } else if (
        this.state.sort === true &&
        this.state.selection === "twentyfour-hours"
      ) {
        return (
          a.price_change_percentage_24h_in_currency -
          b.price_change_percentage_24h_in_currency
        );
      } else if (
        this.state.sort === false &&
        this.state.selection === "twentyfour-hours"
      ) {
        return (
          b.price_change_percentage_24h_in_currency -
          a.price_change_percentage_24h_in_currency
        );
      } else if (
        this.state.sort === true &&
        this.state.selection === "seven-days"
      ) {
        return (
          a.price_change_percentage_7d_in_currency -
          b.price_change_percentage_7d_in_currency
        );
      } else if (
        this.state.sort === false &&
        this.state.selection === "seven-days"
      ) {
        return (
          b.price_change_percentage_7d_in_currency -
          a.price_change_percentage_7d_in_currency
        );
      } else {
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
                <HeadTableRow>
                  <th
                    onClick={this.sortRank}
                    style={{
                      cursor: "pointer",
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      #
                      <div style={{ width: "20px", height: "20px" }}>
                        <SortIcon />
                      </div>
                    </div>
                  </th>
                  <th
                    onClick={this.sortName}
                    style={{
                      cursor: "pointer",
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      Name
                      <div style={{ width: "20px", height: "20px" }}>
                        <SortIcon />
                      </div>
                    </div>
                  </th>
                  <th
                    onClick={this.sortPrice}
                    style={{
                      cursor: "pointer",
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      Price
                      <div style={{ width: "20px", height: "20px" }}>
                        <SortIcon />
                      </div>
                    </div>
                  </th>
                  <th
                    onClick={this.sortOneHour}
                    style={{
                      cursor: "pointer",
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      1h%
                      <div style={{ width: "20px", height: "20px" }}>
                        <SortIcon />
                      </div>
                    </div>
                  </th>
                  <th
                    onClick={this.sortTwentyFourHour}
                    style={{
                      cursor: "pointer",
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      24h%
                      <div style={{ width: "20px", height: "20px" }}>
                        <SortIcon />
                      </div>
                    </div>
                  </th>
                  <th
                    onClick={this.sortSevenDays}
                    style={{
                      cursor: "pointer",
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      7d%
                      <div style={{ width: "20px", height: "20px" }}>
                        <SortIcon />
                      </div>
                    </div>
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    24h Volume/Market Cap
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    Circulating/Total Supply
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      minWidth: "50px",
                    }}
                  >
                    Last 7d
                  </th>
                </HeadTableRow>
              </thead>
              <tbody>
                {sortedAllCoins.map((item) => {
                  return (
                    <BodyTableRow key={crypto.randomUUID()}>
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
                    </BodyTableRow>
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
