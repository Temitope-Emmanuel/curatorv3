import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type FunctionType = Function;

export const useInterval = (cb: FunctionType, delay: number | null) => {
  const savedCb = useRef<FunctionType>();

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => {
      if (savedCb.current) {
        savedCb.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
