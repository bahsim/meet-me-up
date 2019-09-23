import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Fab } from '@material-ui/core';
import { ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons';

import { useInfiniteScrollDown } from '../components/hooks/use-infinite-scroll-down';

const Content = styled.div`
  position: relative;
  display: block;
  margin-top: 60px;
  overflow-y: overlay;
  max-height: calc(100vh - 60px);
`;

const ButtonUpContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const PageList = ({ children }) => {
  const selfRef = useRef(null);
  const [buttonUp] = useInfiniteScrollDown({
    ref: selfRef,
  });
  const scrollToTop = () => {
    selfRef.current.scrollTo(0, 0);
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Content data-ref="asdf" ref={selfRef}>
      {children}
      {buttonUp
        && (
          <ButtonUpContainer onClick={() => scrollToTop()}>
            <Fab color="primary">
              <ArrowUpwardIcon />
            </Fab>
          </ButtonUpContainer>
        )}
    </Content>
  );
};

PageList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
