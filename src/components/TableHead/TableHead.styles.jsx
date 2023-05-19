import styled from "styled-components";

export const TableHeader = styled.th`
  text-align: left;
  min-width: 50px;
`;

export const TitleWrapper = styled.div`
  display: flex;
`;

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

export const TableHeaderSort = styled(TableHeader)`
  cursor: pointer;
`;
