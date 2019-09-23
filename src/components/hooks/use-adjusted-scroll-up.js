import { useCallback } from 'react';

export const useAdjustedScrollUp = ref => {
  /**
   * Scrolls to the previous position or completely to bottom (on demand)
   */
  const adjust = useCallback(
    (scrollToBottom, previousScroll) => {
      if (!ref.current) return;

      const node = ref.current;

      const height = !scrollToBottom && previousScroll
        ? previousScroll.height
        : node.clientHeight;

      node.scrollTop = node.scrollHeight - height;
    },
    [ref],
  );

  return adjust;
};
