import React from "react";
import { datePipe } from "../utils/datePipe";
import { styled } from "@mui/system";

const LastScrap = styled("h5")({
  border: "none",
  color: "black",
  textAlign: "left",
  direction: "rtl",
  display: "inline-block",
  fontSize: "10px",
});

interface Props {
  date: Date;
}
export const LastUpdateComponent: React.FC<Props> = (props) => {
  return (
    <LastScrap>השיעורים עודכנו לאחרונה בתאריך {datePipe(props.date)}</LastScrap>
  );
};
