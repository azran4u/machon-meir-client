import { useEffect, useRef } from "react";
import {
  selectCurrentLesson,
  selectSeriesNextLesson,
  selectSeriesPrevLesson,
  setLessonId,
} from "../lessons/currentPlayingSlice";
// import { selectLessonById } from "../lessons/lessonsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { dateFormat } from "../utils/dateFormat";
import { BlackButtonComponent } from "./blackButtonComponent";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const H5 = styled.h5`
  margin-top: 20px;
  text-align: center;
  direction: rtl;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const Audio = styled.audio`
  margin-top: 20px;
`;

interface Props {
  match: { params: { lesson_id: string } };
}

// eslint-disable-next-line react/prop-types
export const MediaPlayerComponent: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  dispatch(setLessonId(props.match.params.lesson_id));
  const lesson = useAppSelector(selectCurrentLesson);
  const next = useAppSelector(selectSeriesNextLesson);
  const prev = useAppSelector(selectSeriesPrevLesson);

  const audio = useRef<HTMLAudioElement>(null);

  const PLAYBACK = 30;
  useEffect(() => {
    const currentTimeInLocalStorage = +localStorage.getItem(lesson?.mediaUrl);
    if (currentTimeInLocalStorage) {
      audio.current.currentTime =
        currentTimeInLocalStorage > PLAYBACK
          ? currentTimeInLocalStorage - PLAYBACK
          : 0;
    }
  }, [lesson]);

  const onPause = () => {
    localStorage.setItem(
      lesson?.mediaUrl,
      audio.current.currentTime.toString()
    );
  };

  return (
    <div>
      {lesson && (
        <FlexContainer>
          <Audio
            ref={audio}
            src={lesson.mediaUrl}
            controls
            autoPlay
            onPause={onPause}
          ></Audio>
          <H5>{lesson.title}</H5>
          <H5>תגיות: {lesson.tags.join(" , ")}</H5>
          <H5>{dateFormat(lesson.date)}</H5>
          <div>
            <BlackButtonComponent
              type="button"
              onClick={() => {
                history.push(`/media/${prev.id}`);
              }}
            >
              שיעור קודם
            </BlackButtonComponent>
            <BlackButtonComponent
              type="button"
              onClick={() => {
                history.push(`/media/${next.id}`);
              }}
            >
              שיעור הבא
            </BlackButtonComponent>
          </div>
        </FlexContainer>
      )}
    </div>
  );
};
