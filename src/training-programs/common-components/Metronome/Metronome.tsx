import React, { useEffect, useState } from "react";
import useSound from "use-sound";

import tickSound from "../../../static/tick.mp3";
import Button from "../../../components/UI-elements/Button/Button";

type miliseconds = number;

interface Props {
  timing: miliseconds;
}

const Metronome: React.FC<Props> = ({ timing }) => {
  const [ticking, setTicking] = useState(false);

  const [nextTick, setNextTick] = useState(0);

  const toggleTicking = () => {
    setTicking((t) => {
      if (t) {
        setNextTick(0);
      } else {
        const now = new Date().getTime();
        setNextTick(now + timing);
      }
      return !t;
    });
  };

  const [playSound] = useSound(tickSound);
  useEffect(() => {
    let timer: NodeJS.Timer;

    if (ticking) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        if (now >= nextTick) {
          setNextTick((nt) => nt + timing);
          playSound();
        }
      }, 10);
    }

    return () => clearInterval(timer);
  }, [ticking, nextTick, timing, playSound]);

  return (
    <Button stretch onClick={toggleTicking}>
      {`${ticking ? "Stop" : "Start"} Ticking`}
    </Button>
  );
};

export default Metronome;
