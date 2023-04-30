import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    font-family: sans-serif;
  }
  body {
    background: ${(props) => props.theme.main};
    margin: 0;
  }
  .text {
    color: ${(props) => props.theme.text};
  }

  .button {
    background-color: ${(props) => props.theme.secondary}
  }

  ::placeholder {
    color: ${(props) => props.theme.text};
  }

  :-ms-input-placeholder {
    color: ${(props) => props.theme.text};
  }

  ::-ms-input-placeholder {
    color: ${(props) => props.theme.text};
  }
`;

export const lightTheme = {
  main: "#d3d3d3",
  secondary: "#d3d3d3",
  text: "#000",
};

export const darkTheme = {
  main: "#1f2128",
  secondary: "#2c2f36",
  text: "#fff",
};
