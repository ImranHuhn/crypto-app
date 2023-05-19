import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const Container = styled.div`
  position: relative;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 95%;
  margin: 0 auto;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 135px;
  height: 44px;
  margin: 0 10px;
`;

export const RightNavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
`;

export const Input = styled.input`
  padding-left: 35px;
  height: 44px;
  border-radius: 8px;
  border: none;
  width: 400px;
`;

export const CurrencyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 8px;
  border: none;
  margin: 0 20px;
  width: 100px;
`;

export const ThemeButton = styled.button`
  height: 44px;
  width: 40px;
  border-radius: 8px;
  border: none;
  position: absolute;
  right: 0;
  margin: 0 20px;
`;

export const DollarIconWrapper = styled.div`
  width: 24px;
`;

export const MagnifyIconWrapper = styled.div`
  width: 20px;
  position: absolute;
  left: 10px;
`;

export const ChevronIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  transform: rotate(180deg);
`;

export const CurrencyList = styled.ul`
  display: none;
`;

export const DarkThemeIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 24px;
`;

export const SubNavbarWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #191b1f;
  width: 50%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
