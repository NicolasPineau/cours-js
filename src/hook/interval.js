import { useEffect, useRef, useState } from 'react';

export const useInterval = (callback, delay = null) => {
  const savedCallback = useRef();
  const [active, setActive] = useState(true);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      active && savedCallback.current();
    };

    if (delay !== null) {
      const id = active && setInterval(tick, delay);

      return () => {
        id && clearInterval(id);
      }
    }
  }, [delay, active]);

  return {
    pause() {
      setActive(false);
    },
    play() {
      setActive(true);
    },
  };
};
