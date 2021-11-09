import styled from "styled-components";

export const TextField = styled.input`
  height: 32px;
  width: 60%;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  text-align: right;
  &:hover {
    cursor: pointer;
  }
  justify-content: center;
`;
