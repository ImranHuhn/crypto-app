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
              <Input className="text second" $on={this.props.on} placeholder="Search..." />
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
          <div>Coins: 7884</div>
          <div>Exchange: 622</div>
          <div>()</div>
          <div>$1.69T ^</div>
          <div>()</div>
          <div>$124.45B ======</div>
          <div>() 44% ======</div>
          <div>() 21% ======</div>
        </SubNav>
      </Container>
    );
  }
}

export default Navbar;
