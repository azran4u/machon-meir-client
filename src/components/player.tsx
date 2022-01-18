import { useEffect, useRef, useState } from "react";
import {
  selectCurrentLesson,
  selectSeriesNextLesson,
  selectSeriesPrevLesson,
  setLessonId,
} from "../lessons/currentPlayingSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { dateFormat } from "../utils/dateFormat";
import { useHistory } from "react-router-dom";
import FastForwardIcon from "@mui/icons-material/FastForward";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const marks = [
  {
    value: 0.5,
    label: "0.5",
  },
  {
    value: 1,
    label: "1.0",
  },
  {
    value: 1.5,
    label: "1.5",
  },
  {
    value: 2,
    label: "2.0",
  },
];

function valuetext(value: number) {
  return marks.find((x) => x.value === value)?.label ?? "";
}

const H5 = styled("h5")({
  marginTop: "20px",
  textAlign: "center",
  direction: "rtl",
});

const FlexContainerColumn = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10%",
});

const FlexContainerRow = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
});

const Audio = styled("audio")({
  marginTop: "20px",
});

const StyledButton = styled(Button)({
  margin: "20px",
});

interface Props {
  match: { params: { lesson_id: string } };
}

// eslint-disable-next-line react/prop-types
export const PlayerComponent: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  dispatch(setLessonId(props.match.params.lesson_id));
  const lesson = useAppSelector(selectCurrentLesson);
  const next = useAppSelector(selectSeriesNextLesson);
  const prev = useAppSelector(selectSeriesPrevLesson);

  const DEFAULT_PLAYBACK_SPEED = 1.0;
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_PLAYBACK_SPEED);

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

  useEffect(() => {
    if (audio?.current) {
      audio.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const onPause = () => {
    localStorage.setItem(
      lesson?.mediaUrl,
      audio.current.currentTime.toString()
    );
  };

  return (
    <div>
      {lesson && (
        <FlexContainerColumn>
          <Audio
            ref={audio}
            src={lesson.mediaUrl}
            controls
            autoPlay
            onPause={onPause}
          ></Audio>
          <FlexContainerRow>
            <FastForwardIcon></FastForwardIcon>
            <Box sx={{ width: 300, marginLeft: "20px" }}>
              <Slider
                color="primary"
                aria-label="Playback Speed"
                defaultValue={DEFAULT_PLAYBACK_SPEED}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={0.1}
                min={0.0}
                max={3}
                onChange={(event: Event, value: number) =>
                  setPlaybackSpeed(value)
                }
              />
            </Box>
          </FlexContainerRow>

          <H5>{lesson.title}</H5>
          <H5>תגיות: {lesson.tags.join(" , ")}</H5>
          <H5>{dateFormat(lesson.date)}</H5>
          <div>
            <StyledButton
              variant="contained"
              size="small"
              onClick={() => {
                history.push(`/media/${prev.id}`);
              }}
            >
              שיעור קודם
            </StyledButton>
            <StyledButton
              variant="contained"
              size="small"
              onClick={() => {
                history.push(`/media/${next.id}`);
              }}
            >
              שיעור הבא
            </StyledButton>
          </div>
        </FlexContainerColumn>
      )}
    </div>
  );
};
