import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10%",
};

const childStyle: React.CSSProperties = {};

// eslint-disable-next-line react/prop-types
export const MediaPlayerComponent = () => {
  const location = useLocation<{ url: string }>();
  const { url } = location.state;
  const audio = useRef<HTMLAudioElement>(null);
  const PLAYBACK = 30;
  useEffect(() => {
    const currentTimeInLocalStorage = +localStorage.getItem(url);
    if (currentTimeInLocalStorage) {
      audio.current.currentTime =
        currentTimeInLocalStorage > PLAYBACK
          ? currentTimeInLocalStorage - PLAYBACK
          : 0;
    }
  }, [url]);

  const onPause = () => {
    localStorage.setItem(url, audio.current.currentTime.toString());
  };

  return (
    <div style={containerStyle}>
      <audio
        style={childStyle}
        ref={audio}
        src={url}
        controls
        autoPlay
        onPause={onPause}
      ></audio>
    </div>
  );
};
