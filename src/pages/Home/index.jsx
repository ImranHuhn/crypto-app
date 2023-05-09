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
} from "./Home.styles";

class Home extends React.Component {
  state = {
    allCoins: [],
    hasMore: true,
    page: 0,
    isLoading: false,
    tableColumns: {
      market_cap_rank: "#",
      id: "Name",
      current_price: "Price",
      price_change_percentage_1h_in_currency: "1h",
      price_change_percentage_24h_in_currency: "24h",
      price_change_percentage_7d_in_currency: "7d",
      total_volume: "24h Volume",
      market_cap: "Market Cap",
      circulating_and_supply: "Circulating / Total Supply",
      total_supply: "Last 7d",
    },
    selection: "",
    sort: null,
  };

  sortingManager = async (selection) => {
    let sort;
    switch (this.state.sort) {
      case null:
        sort = true;
        break;
      case true:
        sort = false;
        break;
      case false:
        sort = null;
        break;
    }
    await getCoins({ sort, selection });
    this.setState({ sort, selection });
  };

  handleInfiniteScroll = async () => {
    const { page, allCoins, totalCoins } = this.state;
    this.setState({ isLoading: true });
    const newPage = page + 1;
    const newData = await getCoins(null, parseInt(newPage));
    const newAllCoins = [...allCoins, ...newData];
    if (allCoins.length - 1 >= totalCoins) {
      this.setState({ hasMore: false });
    }
    setTimeout(() => {
      this.setState({ allCoins: newAllCoins, page: newPage, isLoading: false });
      //////////////////////////////////////////////////////////
      // used for testing
      localStorage.setItem("allCoins", JSON.stringify(newData));
      //////////////////////////////////////////////////////////
    }, 1500);
  };

  componentDidMount = () => {
    // const parsed = queryString.parse(location.search);
    // console.log(parsed);

    // this.handleInfiniteScroll();
    ///////////////////////////////////////////////////
    //used for testing
    const storageData = JSON.parse(localStorage.getItem("allCoins")) || [];
    this.setState({ allCoins: storageData });
    ///////////////////////////////////////////////////
  };

  render() {
    console.log("$$$$$$", this.state.selection);
    const { allCoins, sort, selection, tableColumns, hasMore } = this.state;

    let sortedAllCoins = allCoins.map((item) => item);

    sortedAllCoins.sort((a, b) => {
      const isId = selection === "id";
      const ascendingNumbers = a[selection] - b[selection];
      const descendingNumbers = b[selection] - a[selection];
      const alphabetAtoZ = a.id.localeCompare(b.id);
      const alphabetZtoA = b.id.localeCompare(a.id);
      switch (sort) {
        case true:
          return isId ? alphabetAtoZ : ascendingNumbers;
        case false:
          return isId ? alphabetZtoA : descendingNumbers;
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
                  {Object.entries(tableColumns).map((item) => {
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

export default Home;
