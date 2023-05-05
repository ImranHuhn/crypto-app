import React from "react";
import { SubNavbar } from "../SubNavbar";
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
  SubNavbarWrapper,
} from "./Navbar.styles";
import {
  DarkThemeIcon,
  MagnifyIcon,
  ChevronIcon,
  DollarIcon,
} from "../IconComponent";

export const Navbar = (props) => {
  return (
    <Container className="third" $on={props.on}>
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
            <MagnifyIconWrapper className="text" $on={props.on}>
              <MagnifyIcon />
            </MagnifyIconWrapper>
            <Input
              className="text second"
              $on={props.on}
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
          <ThemeButton className="button" onClick={props.handleClick}>
            <DarkThemeIconWrapper className="fill" $on={props.on}>
              <DarkThemeIcon />
            </DarkThemeIconWrapper>
          </ThemeButton>
        </RightNavbarWrapper>
      </Nav>
      <SubNavbarWrapper className="text third">
        <SubNavbar
          totalCoins={props.totalCoins}
          totalExchanges={props.totalExchanges}
          marketCap={props.marketCap}
          marketVolume={props.marketVolume}
        />
      </SubNavbarWrapper>
    </Container>
  );
};