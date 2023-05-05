import React from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCoins } from "../../utils/api";
import { TableHead } from "../../components/TableHead";
import { TableData } from "../../components/TableData";
import {
  Container,
  ScrollMessage,
  TableWrapper,
  Table,
  HeadTableRow,
} from "./Landing.styles";

class Landing extends React.Component {
  state = {
    allCoins: [],
    hasMore: true,
    page: 0,
    // isLoading: false,
    tableColumns: [
      "#",
      "Name",
      "Price",
      "1h",
      "24h",
      "7d",
      "24h Volume / Market Cap",
      "Circulating / Total Supply",
      "Last 7d",
    ],
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

      //////////////////////////////////////////////////////////
      localStorage.setItem("allCoins", JSON.stringify(newData));
      //////////////////////////////////////////////////////////
    }, 1500);
  };

  componentDidMount = () => {
    this.handleInfiniteScroll();

    ///////////////////////////////////////////////////
    const storageData = JSON.parse(localStorage.getItem("allCoins")) || [];
    this.setState({ allCoins: storageData });
    ///////////////////////////////////////////////////
  };
  render() {
    let sortedAllCoins = this.state.allCoins.map((item) => item);

    sortedAllCoins.sort((a, b) => {
      if (
        this.state.sort === true &&
        this.state.selection === this.state.tableColumns[0]
      ) {
        return a.market_cap_rank - b.market_cap_rank;
      } else if (
        this.state.sort === false &&
        this.state.selection === this.state.tableColumns[0]
      ) {
        return b.market_cap_rank - a.market_cap_rank;
      } else if (
        this.state.sort === true &&
        this.state.selection === this.state.tableColumns[1]
      ) {
        return a.id.localeCompare(b.id);
      } else if (
        this.state.sort === false &&
        this.state.selection === this.state.tableColumns[1]
      ) {
        return b.id.localeCompare(a.id);
      } else if (
        this.state.sort === true &&
        this.state.selection === this.state.tableColumns[2]
      ) {
        return a.current_price - b.current_price;
      } else if (
        this.state.sort === false &&
        this.state.selection === this.state.tableColumns[2]
      ) {
        return b.current_price - a.current_price;
      } else if (
        this.state.sort === true &&
        this.state.selection === this.state.tableColumns[3]
      ) {
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      } else if (
        this.state.sort === false &&
        this.state.selection === this.state.tableColumns[3]
      ) {
        return (
          b.price_change_percentage_1h_in_currency -
          a.price_change_percentage_1h_in_currency
        );
      } else if (
        this.state.sort === true &&
        this.state.selection === this.state.tableColumns[4]
      ) {
        return (
          a.price_change_percentage_24h_in_currency -
          b.price_change_percentage_24h_in_currency
        );
      } else if (
        this.state.sort === false &&
        this.state.selection === this.state.tableColumns[4]
      ) {
        return (
          b.price_change_percentage_24h_in_currency -
          a.price_change_percentage_24h_in_currency
        );
      } else if (
        this.state.sort === true &&
        this.state.selection === this.state.tableColumns[5]
      ) {
        return (
          a.price_change_percentage_7d_in_currency -
          b.price_change_percentage_7d_in_currency
        );
      } else if (
        this.state.sort === false &&
        this.state.selection === this.state.tableColumns[5]
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
                  {this.state.tableColumns.map((item) => {
                    return (
                      <TableHead
                        item={item}
                        tableColumns={this.state.tableColumns}
                        sortingManager={this.sortingManager}
                        key={crypto.randomUUID()}
                      />
                    );
                  })}
                </HeadTableRow>
              </thead>
              <tbody>
                {sortedAllCoins.map((item) => {
                  return (
                    <TableData
                      item={item}
                      allCoins={this.state.allCoins}
                      sort={this.state.sort}
                      selection={this.state.selection}
                      key={crypto.randomUUID()}
                    />
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
