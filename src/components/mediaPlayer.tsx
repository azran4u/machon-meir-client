import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  selectCurrentLesson,
  selectCurrentSeries,
} from "../lessons/currentPlayingSlice";
import { Lesson } from "../model/lesson";
import { useAppSelector } from "../store/hooks";
import { dateFormat } from "../utils/dateFormat";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10%",
};

const hebrewStyle: React.CSSProperties = {
  textAlign: "center",
  direction: "rtl",
};

const childStyle: React.CSSProperties = {
  marginTop: "20px",
};

// eslint-disable-next-line react/prop-types
export const MediaPlayerComponent = () => {
  const lesson = useAppSelector(selectCurrentLesson);
  const audio = useRef<HTMLAudioElement>(null);
  const PLAYBACK = 30;
  useEffect(() => {
    const currentTimeInLocalStorage = +localStorage.getItem(lesson.mediaUrl);
    if (currentTimeInLocalStorage) {
      audio.current.currentTime =
        currentTimeInLocalStorage > PLAYBACK
          ? currentTimeInLocalStorage - PLAYBACK
          : 0;
    }
  }, [lesson]);

  const onPause = () => {
    localStorage.setItem(lesson.mediaUrl, audio.current.currentTime.toString());
  };

  return (
    <div style={containerStyle}>
      {lesson && (
        <div>
          <audio
            style={childStyle}
            ref={audio}
            src={lesson.mediaUrl}
            controls
            autoPlay
            onPause={onPause}
          ></audio>
          <h5 style={{ ...childStyle, ...hebrewStyle }}>{lesson.title}</h5>
          <h5 style={{ ...childStyle, ...hebrewStyle }}>
            תגיות: {lesson.tags.join(" , ")}
          </h5>
          <h5 style={{ ...childStyle, ...hebrewStyle }}>
            {dateFormat(lesson.date)}
          </h5>
        </div>
      )}
    </div>
  );
};
