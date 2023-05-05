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

    let sortedAllCoins = allCoins.map((item) => item);

    sortedAllCoins.sort((a, b) => {
      const ascendByRank = sort === true && selection === tableColumns[0];
      const descendByRank = sort === false && selection === tableColumns[0];
      const ascendByName = sort === true && selection === tableColumns[1];
      const descendByName = sort === false && selection === tableColumns[1];
      const ascendByPrice = sort === true && selection === tableColumns[2];
      const descendByPrice = sort === false && selection === tableColumns[2];
      const ascendBy1h = sort === true && selection === tableColumns[3];
      const descendBy1h = sort === false && selection === tableColumns[3];
      const ascendBy24h = sort === true && selection === tableColumns[4];
      const descendBy24h = sort === false && selection === tableColumns[4];
      const ascendBy7d = sort === true && selection === tableColumns[5];
      const descendBy7d = sort === false && selection === tableColumns[5];
      const rankA = a.market_cap_rank;
      const rankB = b.market_cap_rank;
      const nameAtoZ = a.id.localeCompare(b.id);
      const nameZtoA = b.id.localeCompare(a.id);
      const priceA = a.current_price;
      const priceB = b.current_price;
      const oneHourA = a.price_change_percentage_1h_in_currency;
      const oneHourB = b.price_change_percentage_1h_in_currency;
      const twentyFourHoursA = a.price_change_percentage_24h_in_currency;
      const twentyFourHoursB = b.price_change_percentage_24h_in_currency;
      const sevenDaysA = a.price_change_percentage_7d_in_currency;
      const sevenDaysB = b.price_change_percentage_7d_in_currency;
      switch (true) {
        case ascendByRank:
          return rankA - rankB;
        case descendByRank:
          return rankB - rankA;
        case ascendByName:
          return nameAtoZ;
        case descendByName:
          return nameZtoA;
        case ascendByPrice:
          return priceA - priceB;
        case descendByPrice:
          return priceB - priceA;
        case ascendBy1h:
          return oneHourA - oneHourB;
        case descendBy1h:
          return oneHourB - oneHourA;
        case ascendBy24h:
          return twentyFourHoursA - twentyFourHoursB;
        case descendBy24h:
          return twentyFourHoursB - twentyFourHoursA;
        case ascendBy7d:
          return sevenDaysA - sevenDaysB;
        case descendBy7d:
          return sevenDaysB - sevenDaysA;
        default:
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
