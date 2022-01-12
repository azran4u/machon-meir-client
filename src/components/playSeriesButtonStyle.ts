import styled from "styled-components";
import { ButtonComponent } from "./buttonComponent";

export const PlaySeriesButton = styled(ButtonComponent)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  display: flex;
  align-items: left;
  justify-content: left;
  color: white;
  background-color: #212529;
`;
