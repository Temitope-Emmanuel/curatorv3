import { useRef, useEffect } from 'react';
import { TimeFormatter } from '../utils/TimeFormatter';

const useTimeFormatter = () => {
  const formatTime = useRef<TimeFormatter | null>(null);

  useEffect(() => {
    formatTime.current = new TimeFormatter();
  }, []);

  return formatTime;
};

export default useTimeFormatter;
