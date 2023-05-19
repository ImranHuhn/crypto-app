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

  .fill {
    fill: ${(props) => props.theme.text};
  }

  .main {
    background-color: ${(props) => props.theme.main};
  }

  .second, .button {
    background-color: ${(props) => props.theme.second}
  }

  .third {
    background-color: ${(props) => props.theme.third}
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
  main: "#ededed",
  second: "#ededed",
  third: "#fff",
  text: "#000",
};

export const darkTheme = {
  main: "#1f2128",
  second: "#2c2f36",
  third: "#191b1f",
  text: "#fff",
};
