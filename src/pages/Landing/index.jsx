import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCoins } from "../../utils/api";
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

  componentDidMount = async () => {
    this.handleInfiniteScroll();
  };
  render() {
    const hasCoins = !this.state.isLoading && this.state.allCoins;
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
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>1h%</th>
                  <th>24h%</th>
                  <th>7d%</th>
                  <th>24h Volume/Market Cap</th>
                  <th>Circulating/Total Supply</th>
                  <th>Last 7d</th>
                </TableRow>
              </thead>
              <tbody>
                {this.state.allCoins.map((item) => {
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
