import styled from "styled-components";
import { ButtonComponent } from "./buttonComponent";

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const TextField = styled.input`
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
`;

const ClearButton = styled(ButtonComponent)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 32px;
  color: white;
  background-color: #212529;
  text-align: center;
`;

const Space = styled.div`
  height: 32px;
  width: 32px;
`;

const PlaySeriesButton = styled.button`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  color: white;
  background-color: #212529;
`;

interface Props {
  filterText: any;
  onFilter: any;
  onClear: any;
  onPlaySeries: any;
}
export const SearchComponent: React.FC<Props> = (props) => {
  return (
    <Container>
      <ClearButton type="button" onClick={props.onClear}>
        X
      </ClearButton>
      <TextField
        id="search"
        type="text"
        placeholder="הקלד מילות חיפוש"
        aria-label="Search Input"
        value={props.filterText}
        onChange={props.onFilter}
      />
      <Space />
      <PlaySeriesButton type="button" onClick={props.onPlaySeries}>
        נגן סדרה
      </PlaySeriesButton>
    </Container>
  );
};

// eslint-disable-next-line react/prop-types
// export const SearchComponent = ({ filterText, onFilter, onClear }: any) => (
//   <>
//     <TextField
//       id="search"
//       type="text"
//       placeholder="הקלד מילות חיפוש"
//       aria-label="Search Input"
//       value={filterText}
//       onChange={onFilter}
//     />
//     <ClearButton type="button" onClick={onClear}>
//       X
//     </ClearButton>
//   </>
// );
