import styled from "styled-components";

export const FillBar = styled.div`
  width: ${(props) => props.fillwidth}%;
  background-color: ${(props) => props.fillcolor};
`;

export const List = styled.li`
  color: ${(props) => props.textcolor};
`;

