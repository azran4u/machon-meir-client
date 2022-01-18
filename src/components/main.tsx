import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectLessonsSnapshot } from "../lessons/lessonsSlice";
import { LastUpdateComponent } from "./lastUpdate";
import { SearchComponent } from "./search";
import { LessonsTableComponent } from "./lessons";
import {
  selectLessonsWithSearchTerm,
  selectSearchTerm,
  setSearchTerm,
} from "../lessons/currentPlayingSlice";
import { styled } from "@mui/system";

const FlexContainerColumn = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "stretch",
});

const StyledLastScrapComponent = styled(LastUpdateComponent)({
  alignSelf: "flex-end",
});

const StyledLessonsTableComponent = styled(LessonsTableComponent)({});

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { snapshot, loading, error } = useAppSelector(selectLessonsSnapshot);
  const filteredItems = useAppSelector(selectLessonsWithSearchTerm);
  const searchTerm = useAppSelector(selectSearchTerm);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const clearSearch = () => {
    if (searchTerm) {
      setResetPaginationToggle(!resetPaginationToggle);
      dispatch(setSearchTerm(""));
    }
  };

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        <StyledLastScrapComponent date={snapshot.date} />
        <FlexContainerColumn>
          <SearchComponent
            onFilter={(e: any) => dispatch(setSearchTerm(e.target.value))}
            onClear={clearSearch}
            filterText={searchTerm}
          />

          <StyledLessonsTableComponent
            data={filteredItems}
            resetPaginationToggle={resetPaginationToggle}
            loading={loading}
          />
        </FlexContainerColumn>
      </div>
    );
  }
};
