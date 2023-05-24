import styled from "styled-components";

export const FillBar = styled.div`
  width: ${(props) => props.fillWidth}%;
  background-color: ${(props) => props.fillColor};
`;

export const List = styled.li`
  color: ${(props) => props.textColor};
`;

