import React from "react";
import {
  StyledLink,
  Container,
  Nav,
  LinkContainer,
  LinkWrapper,
  RightNavbarWrapper,
  InputWrapper,
  Input,
  CurrencyButton,
  ThemeButton,
  DollarIconWrapper,
  MagnifyIconWrapper,
  ChevronIconWrapper,
  CurrencyList,
  DarkThemeIconWrapper,
  SubNav,
} from "./Navbar.styles";
import {
  DarkThemeIcon,
  MagnifyIcon,
  ChevronIcon,
  DollarIcon,
} from "../IconComponent";

class Navbar extends React.Component {
  render() {
    return (
      <Container className="third" $on={this.props.on}>
        <Nav>
          <LinkContainer>
            <LinkWrapper>
              <StyledLink className="text button" to="/">
                Coins
              </StyledLink>
            </LinkWrapper>
            <LinkWrapper>
              <StyledLink className="text button" to="/portfolio">
                Portfolio
              </StyledLink>
            </LinkWrapper>
          </LinkContainer>
          <RightNavbarWrapper>
            <InputWrapper>
              <MagnifyIconWrapper className="text" $on={this.props.on}>
                <MagnifyIcon />
              </MagnifyIconWrapper>
              <Input
                className="text second"
                $on={this.props.on}
                placeholder="Search..."
              />
              <CurrencyButton className="text button">
                <DollarIconWrapper>
                  <DollarIcon />
                </DollarIconWrapper>
                USD
                <ChevronIconWrapper>
                  <ChevronIcon />
                </ChevronIconWrapper>
              </CurrencyButton>
              <CurrencyList>
                <li>USD</li>
                <li>GBP</li>
                <li>EUR</li>
                <li>BTC</li>
                <li>ETH</li>
              </CurrencyList>
            </InputWrapper>
            <ThemeButton className="button" onClick={this.props.handleClick}>
              <DarkThemeIconWrapper className="fill" $on={this.props.on}>
                <DarkThemeIcon />
              </DarkThemeIconWrapper>
            </ThemeButton>
          </RightNavbarWrapper>
        </Nav>
        <SubNav className="text third">
          <div>Coins {this.props.totalCoins}</div>
          <div>Exchange {this.props.totalExchanges}</div>
          <h2 style={{ margin: "auto 5px" }}>•</h2>
          <div>
            ${this.props.marketCap?.usd}T
            {/* selected currency from nav for "total_market_cap" */}
          </div>
          <div>
            ^
            {/* arrow up down with determine if value is positive or negative for "market_cap_change_percentage_24h_usd" */}
          </div>
          <h2 style={{ margin: "auto 5px" }}>•</h2>
          <div>
            ${this.props.marketVolume?.usd}B
            {/* selected currency from nav for "total_volume" */} ======
          </div>
          <div>() {this.props.marketCap?.btc}% ======</div>
          <div>() {this.props.marketCap?.eth}% ======</div>
        </SubNav>
      </Container>
    );
  }
}

export default Navbar;
