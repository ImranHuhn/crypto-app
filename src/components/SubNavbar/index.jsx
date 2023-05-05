import React from "react";
import { Wrapper, Dot, Image } from "./SubNavbar.styles";
import { ChevronIcon } from "../IconComponent";
import bitcoin from "../../assets/bitcoin.webp";
import ethereum from "../../assets/ethereum.webp";

export const SubNavbar = (props) => {
  return (
    <>
      <Wrapper>
        <div>Coins</div>
        <div>{props.totalCoins}</div>
      </Wrapper>
      <Wrapper>
        <div>Exchange</div>
        <div>{props.totalExchanges}</div>
      </Wrapper>
      <Dot>&#9679;</Dot>
      <div>
        ${props.marketCap?.usd}T
        {/* selected currency from nav for "total_market_cap" */}
      </div>
      <div>
        <ChevronIcon />
        {/* arrow up down with determine if value is positive or negative for "market_cap_change_percentage_24h_usd" */}
      </div>
      <Dot>&#9679;</Dot>
      <div>
        ${props.marketVolume?.usd}B
        {/* selected currency from nav for "total_volume" */}{" "}
        {/* bar = total volume / total market cap */}
      </div>
      <div>
        <div>
          <Image src={bitcoin} alt="bitcoin" />
        </div>
        <div>
          <div>{props.marketCap?.btc}%</div>
          <div>
            <div>bar</div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Image src={ethereum} alt="ethereum" />
        </div>
        <div>
          <div>{props.marketCap?.eth}%</div>
          <div>
            <div>bar</div>
          </div>
        </div>
      </div>
    </>
  );
};