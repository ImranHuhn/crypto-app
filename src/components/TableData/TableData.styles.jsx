import styled from "styled-components";

export const FillBar = styled.div.attrs((props) => ({
  style: {
    width: `${props.fillWidth}%`,
    backgroundColor: `${props.fillColor}`,
  },
}));

// export const FillBar = styled.div`
//   width: ${(props) => props.fillWidth}%;
//   background-color: ${(props) => props.fillColor};
// `;

export const List = styled.li`
  color: ${(props) => props.textColor};
`;

// const Component = styled.div.attrs(props => ({
//   style: {
//     background: props.background,
//   },
// }))`width: 100%;`
