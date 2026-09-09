import { useEffect, useRef } from 'react';

/**
 * Custom hook for declarative intervals (telemetry polls, time updates)
 * @param {() => void} callback
 * @param {number | null} delay
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
