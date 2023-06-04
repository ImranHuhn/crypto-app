import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import queryString from "query-string";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getCoins } from "utils/api";
import { MainCharts, TableHead, TableData } from "components";
import { CurrencyContext } from "../../context/CurrencyContext";

export const Coins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selection, setSelection] = useState("");
  const [sort, setSort] = useState(null);
  const [parsed, setParsed] = useState(null);

  const currency = useContext(CurrencyContext);
  const navigate = useNavigate();

  const tableColumns = {
    market_cap_rank: "#",
    id: "Name",
    current_price: "Price",
    price_change_percentage_1h_in_currency: "1h%",
    price_change_percentage_24h_in_currency: "24h%",
    price_change_percentage_7d_in_currency: "7d%",
    total_volume: "24h Volume",
    market_cap: "Market Cap",
    circulating_and_supply: "Circulating/Total Supply",
    total_supply: "Last 7d",
  };

  let sortedAllCoins = allCoins.map((item) => item);

  if (sort === true || sort === false) {
    sortedAllCoins = [...sortedAllCoins];
    sortedAllCoins.sort((a, b) => {
      const isId = selection === "id";
      if (isId) {
        const alphabetAtoZ = a.id.localeCompare(b.id);
        const alphabetZtoA = b.id.localeCompare(a.id);
        return sort ? alphabetAtoZ : alphabetZtoA;
      } else {
        const ascendingNumbers = a[selection] - b[selection];
        const descendingNumbers = b[selection] - a[selection];
        return sort ? ascendingNumbers : descendingNumbers;
      }
    });
  }

  const sortingManager = async (selection) => {
    let newSort, newSelection;
    switch (sort) {
      case null:
        newSort = true;
        newSelection = selection.concat("_asc");
        break;
      case true:
        newSort = false;
        newSelection = selection.concat("_desc");
        break;
      case false:
        newSort = null;
        newSelection = "market_cap_desc";
        break;
    }
    await getCoins({
      sort: newSort,
      newSelection,
      vs_currency: currency,
    });
    setSort(newSort);
    setSelection(selection);
  };

  const handleInfiniteScroll = async () => {
    setLoading(true);
    const newPage = page + 1;
    const newData = await getCoins({
      page: parseInt(newPage),
      vs_currency: currency,
    });
    const hasMoreCoins = !!newData.length;
    
    if (hasMoreCoins) {
      const newAllCoins = [...allCoins, ...newData];
      setTimeout(() => {
        setLoading(false);
        setError(false);
        setAllCoins(newAllCoins);
        setPage(newPage);
        setHasMore(hasMoreCoins);
      }, 1500);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(newData.errorMessage);
    }
  };

  useEffect(() => {
    const query = queryString.stringify({
      selection,
      sort,
      vs_currency: currency,
    });
    if (selection || sort === "") {
      navigate(`/?${query}`);
    }
  }, [selection, sort]);

  useEffect(() => {
    handleInfiniteScroll();
    const newParsed = queryString.parse(location.search, {
      parseBooleans: true,
    });
    setParsed(newParsed);
  }, []);

  return (
    <div className="overflow-auto">
      <InfiniteScroll
        dataLength={allCoins.length}
        next={handleInfiniteScroll}
        hasMore={hasMore}
        loader={
          !error && (
            <h1 className="text-black dark:text-white text-center">
              Loading...
            </h1>
          )
        }
        endMessage={
          !hasMore && (
            <h1 className="text-black dark:text-white text-center">
              All coins have been loaded!
            </h1>
          )
        }
      >
        <div className="text-black dark:text-white w-[95%] mx-auto mt-24 mb-0 px-0 py-2.5">
          <MainCharts />
          <h1 className="text-3xl text-black font-bold dark:text-white py-6">
            Market Overview
          </h1>
          <div className="bg-white dark:bg-[#191b1f] w-full mx-auto rounded-lg">
            <table className="mx-auto w-[95%] overflow-hidden">
              <thead>
                <tr className="h-24">
                  {Object.entries(tableColumns).map((item) => {
                    return (
                      <TableHead
                        item={item}
                        tableColumns={tableColumns}
                        sortingManager={sortingManager}
                        key={item}
                      />
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedAllCoins.map((item) => {
                  return (
                    <TableData
                      isLoading={loading}
                      item={item}
                      allCoins={allCoins}
                      sort={sort}
                      selection={selection}
                      key={item.id}
                    />
                  );
                })}
                {loading && (
                  <tr>
                    <td colSpan="10">
                      <Skeleton count={10} />
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="10" className="text-center">
                      {errorMessage.message}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};
