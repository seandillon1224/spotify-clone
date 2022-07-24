import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
  // State
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState<number>(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  // Ref
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setActiveSong = useStoreActions(
    (action: any) => action.changeActiveSong
  );
  useEffect(() => {
    let timerId;

    if (playing && !seeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, seeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  const togglePlayState = () => setPlaying((p) => !p);
  const toggleSeeking = () => setSeeking((s) => !s);
  const onShuffle = () => setShuffle((s) => !s);
  const onRepeat = () => setRepeat((r) => !r);

  const goToPrevSong = () =>
    setIndex((prevState) => (prevState ? prevState - 1 : songs.length - 1));

  const goToNextSong = () =>
    setIndex((prevState) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === prevState) return goToNextSong();
        return next;
        // shuffle
      }
      return prevState !== songs.length - 1 ? prevState + 1 : 0;
    });

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      goToNextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          onLoad={onLoad}
          onEnd={onEnd}
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            onClick={onShuffle}
            color={shuffle ? "white" : "gray.600"}
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            onClick={goToPrevSong}
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
          />
          {!playing ? (
            <IconButton
              onClick={togglePlayState}
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
            />
          ) : (
            <IconButton
              onClick={togglePlayState}
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            onClick={goToNextSong}
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
          />
          <IconButton
            onClick={onRepeat}
            color={repeat ? "white" : "gray.600"}
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? Number(duration.toFixed(2)) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={toggleSeeking}
              onChangeEnd={toggleSeeking}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%">
            <Text textAlign="right" fontSize="xs">
              {formatTime(activeSong.duration)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
