import styled from "styled-components";
import { ButtonComponent } from "./buttonComponent";

export const ClearButton = styled(ButtonComponent)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #212529;
`;