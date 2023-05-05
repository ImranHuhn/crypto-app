import React from "react";
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
    isLoading: false,
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
    const { page, allCoins, totalCoins } = this.state;
    this.setState({ isLoading: true });
    const newPage = page + 1;
    const newData = await getCoins(parseInt(newPage));
    const newAllCoins = [...allCoins, ...newData];
    if (allCoins.length - 1 >= totalCoins) {
      this.setState({ hasMore: false });
    }
    setTimeout(() => {
      this.setState({ allCoins: newAllCoins, page: newPage, isLoading: false });
    }, 1500);
  };

  componentDidMount = () => {
    this.handleInfiniteScroll();
  };

  render() {
    const { allCoins, sort, selection, tableColumns, hasMore } = this.state;
    const ascendByRank = sort === true && selection === tableColumns[0],
      descendByRank = sort === false && selection === tableColumns[0],
      ascendByName = sort === true && selection === tableColumns[1],
      descendByName = sort === false && selection === tableColumns[1],
      ascendByPrice = sort === true && selection === tableColumns[2],
      descendByPrice = sort === false && selection === tableColumns[2],
      ascendBy1h = sort === true && selection === tableColumns[3],
      descendBy1h = sort === false && selection === tableColumns[3],
      ascendBy24h = sort === true && selection === tableColumns[4],
      descendBy24h = sort === false && selection === tableColumns[4],
      ascednBy7d = sort === true && selection === tableColumns[5],
      descendBy7d = sort === false && selection === tableColumns[5];

    let sortedAllCoins = allCoins.map((item) => item);

    sortedAllCoins.sort((a, b) => {
      if (ascendByRank) {
        return a.market_cap_rank - b.market_cap_rank;
      } else if (descendByRank) {
        return b.market_cap_rank - a.market_cap_rank;
      } else if (ascendByName) {
        return a.id.localeCompare(b.id);
      } else if (descendByName) {
        return b.id.localeCompare(a.id);
      } else if (ascendByPrice) {
        return a.current_price - b.current_price;
      } else if (descendByPrice) {
        return b.current_price - a.current_price;
      } else if (ascendBy1h) {
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      } else if (descendBy1h) {
        return (
          b.price_change_percentage_1h_in_currency -
          a.price_change_percentage_1h_in_currency
        );
      } else if (ascendBy24h) {
        return (
          a.price_change_percentage_24h_in_currency -
          b.price_change_percentage_24h_in_currency
        );
      } else if (descendBy24h) {
        return (
          b.price_change_percentage_24h_in_currency -
          a.price_change_percentage_24h_in_currency
        );
      } else if (ascednBy7d) {
        return (
          a.price_change_percentage_7d_in_currency -
          b.price_change_percentage_7d_in_currency
        );
      } else if (descendBy7d) {
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
          dataLength={allCoins.length}
          next={this.handleInfiniteScroll}
          hasMore={hasMore}
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
                  {tableColumns.map((item) => {
                    return (
                      <TableHead
                        item={item}
                        tableColumns={tableColumns}
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
                      isLoading={this.state.isLoading}
                      item={item}
                      allCoins={allCoins}
                      sort={sort}
                      selection={selection}
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
