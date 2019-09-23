import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScrollUp = ({
  ref, hasMore, onLoadMore, adjustScroll,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [previousScroll, setPreviousScroll] = useState();
  const [buttonDown, setButtonDown] = useState(false);

  const handleScroll = useCallback(() => {
    const elem = ref.current;

    if (elem.scrollHeight - elem.clientHeight - 100 > elem.scrollTop) {
      setButtonDown(true);
    } else {
      setButtonDown(false);
    }

    if (ref.current.scrollTop === 0 && isFetching === false && hasMore) {
      // starts to fetch if scrolled to top, fetching is not in progress and has more data
      // const elem = ref.current;
      setPreviousScroll({
        top: elem.scrollTop,
        height: elem.scrollHeight + 100,
      });
      setIsFetching(true);
    }
  }, [ref, isFetching, hasMore, previousScroll]);

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

  // loads more if fetching has started
  useEffect(() => {
    if (isFetching) {
      onLoadMore(stopFetching);
    }
  }, [isFetching, onLoadMore]);

  const stopFetching = useCallback(() => {
    setIsFetching(false);
    adjustScroll(false, previousScroll);
  }, [previousScroll]);

  return [isFetching, stopFetching, buttonDown];
};

export default useInfiniteScrollUp;
