import { ClearButton } from "./clearButtonStyle";
import { TextField } from "./inputTextFieldStyle";

// eslint-disable-next-line react/prop-types
export const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="הקלד מילות חיפוש"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);
