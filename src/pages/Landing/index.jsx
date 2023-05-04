import React from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCoins } from "../../utils/api";
import TableHead from "../../components/TableHead";
// import { SortIcon } from "../../components/IconComponent";
import {
  Container,
  ScrollMessage,
  TableWrapper,
  Table,
  HeadTableRow,
  // DataTableRow,
} from "./Landing.styles";

class Landing extends React.Component {
  state = {
    allCoins: [],
    hasMore: true,
    page: 0,
    isLoading: false,
    tableHeadColumns: [
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
    }, 1500);
  };

  componentDidMount = () => {
    this.handleInfiniteScroll();
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
    // console.log(this.state.tableHeadColumns)
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
                  {this.state.tableHeadColumns.map((item) => {
                    return (
                      <TableHead
                        item={item}
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
                    <TableData item={item} key={crypto.randomUUID()} />
                    // <DataTableRow key={crypto.randomUUID()}>
                    //   <td>{item?.market_cap_rank}</td>
                    //   <td>
                    //     <img src={item?.image} style={{ width: "24px" }} />
                    //     {item?.id || <Skeleton />} (
                    //     {item?.symbol || <Skeleton />})
                    //   </td>
                    //   <td>{item?.current_price || <Skeleton />}</td>
                    //   <td>
                    //     {item?.price_change_percentage_1h_in_currency || (
                    //       <Skeleton />
                    //     )}
                    //   </td>
                    //   <td>
                    //     {item?.price_change_percentage_24h_in_currency || (
                    //       <Skeleton />
                    //     )}
                    //   </td>
                    //   <td>
                    //     {item?.price_change_percentage_7d_in_currency || (
                    //       <Skeleton />
                    //     )}
                    //   </td>
                    //   <td>
                    //     {item?.total_volume || <Skeleton />}
                    //     {" / "}
                    //     {item?.market_cap || <Skeleton />}
                    //   </td>
                    //   <td>
                    //     {" "}
                    //     {item?.circulating_supply || <Skeleton />}
                    //     {" / "}
                    //     {item?.total_supply || <Skeleton />}
                    //   </td>
                    //   <td>9</td>
                    // </DataTableRow>
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
