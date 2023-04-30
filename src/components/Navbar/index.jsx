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
      <Container $on={this.props.on}>
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
              <MagnifyIconWrapper $on={this.props.on}>
                <MagnifyIcon />
              </MagnifyIconWrapper>
              <Input $on={this.props.on} placeholder="Search..." />
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
              <DarkThemeIconWrapper $on={this.props.on}>
                <DarkThemeIcon />
              </DarkThemeIconWrapper>
            </ThemeButton>
          </RightNavbarWrapper>
        </Nav>
      </Container>
    );
  }
}

export default Navbar;
