import React from "react";
import { getMarketData } from "../../utils/api";
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
  state = {
    coins: "",
    exchanges: "",
    bitcoin: "",
    ethereum: "",
  };

  handleMarketData = async () => {
    const newData = await getMarketData();
    // console.log(newData.data.market_cap_percentage.btc);
    this.setState({
      coins: newData.data.active_cryptocurrencies,
      exchanges: newData.data.markets,
      bitcoin: newData.data.market_cap_percentage.btc,
      ethereum: newData.data.market_cap_percentage.eth,
    });
  };

  componentDidMount = () => {
    this.handleMarketData();
  };

  render() {
    console.log("$$$", this.state);
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
          <div>Coins {this.state.coins}</div>
          <div>Exchange {this.state.exchanges}</div>
          <h2 style={{ margin: "auto 5px" }}>•</h2>
          <div>$1.69T ^</div>
          <h2 style={{ margin: "auto 5px" }}>•</h2>
          <div>$124.45B ======</div>
          <div>() {this.state.bitcoin}% ======</div>
          <div>() {this.state.ethereum}% ======</div>
        </SubNav>
      </Container>
    );
  }
}

export default Navbar;
