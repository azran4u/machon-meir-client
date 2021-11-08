import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Spinner } from "react-bootstrap";
import { LessonViewerComponent } from "./lessonsViewer";
import { fetchLessonsAsync, selectLessons } from "./rabbifiremanSlice";

import "./rabbifiremanStyles.css";

export const RabbiFiremanComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLessonsAsync());
  }, [dispatch]);

  const { lessons, loading, error } = useAppSelector(selectLessons);

  const showSpinner = loading;

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        {showSpinner && (
          <div className="container_horizontal">
            <Spinner
              animation="border"
              role="status"
              className="spinner item_horizontal"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {lessons && <LessonViewerComponent lessons={lessons} />}
      </div>
    );
  }
};
