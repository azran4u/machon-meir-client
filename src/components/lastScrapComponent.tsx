import React from "react";
import styled from "styled-components";
import { datePipe } from "../utils/datePipe";

const LastScrap = styled.h5`
  border: none;
  color: black;
  text-align: left;
  direction: "rtl"
  display: inline-block;
  font-size: 10px;
`;

interface Props {
  date: Date;
}
export const LastScrapComponent: React.FC<Props> = (props) => {
  return (
    <LastScrap>השיעורים עודכנו לאחרונה בתאריך {datePipe(props.date)}</LastScrap>
  );
};
