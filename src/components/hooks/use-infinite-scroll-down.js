import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScrollDown = ({ ref }) => {
  const [buttonUp, setButtonUp] = useState(false);

  const handleScroll = useCallback(() => {
    const elem = ref.current;

    if (elem.scrollTop - 500 > 0) {
      setButtonUp(true);
    } else {
      setButtonUp(false);
    }
  }, [ref]);

  useEffect(() => {
    const elem = ref.current;

    if (!elem) {
      return;
    }

    elem.addEventListener('scroll', handleScroll);

    return () => {
      elem.removeEventListener('scroll', handleScroll);
    };
  }, [ref, handleScroll]);

  return [buttonUp];
};

export default useInfiniteScrollDown;
