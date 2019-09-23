import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { replaceIsAdult } from '../../modules/auth';

const styles = {
  button: {
    margin: '3px',
  },
};

const Contatainer = styled.div`
  position: relative;
  text-align: center;
  color: white;
`;

const ImageBlurred = styled.img`
  -webkit-filter: blur(8px);
  filter: blur(8px);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
`;

const ImageBase = ({
  isLoggedIn,
  isAdult,
  setIsAdult,
  src,
  onClick,
  style,
  classes,
  width,
}) => (isLoggedIn === true || isAdult === true ? (
// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <img
    src={src}
    onClick={onClick}
    onKeyUp={onClick}
    style={style}
    alt=""
    width={width}
  />
) : (
  <Contatainer>
    <ImageBlurred src={src} style={style} width={width || null} />
    <Content>
      <img src="/statics/icons/18-old-colored.svg" alt="" />
      <Typography variant="h6">
        <strong>Вам есть 18?</strong>
      </Typography>
      <Buttons>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={(e) => {
            e.stopPropagation();
            setIsAdult();
          }}
        >
            Да
        </Button>
        <Button variant="outlined" className={classes.button}>
            Нет
        </Button>
      </Buttons>
    </Content>
  </Contatainer>
));

ImageBase.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdult: PropTypes.bool.isRequired,
  setIsAdult: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string,
};

ImageBase.defaultProps = {
  onClick: null,
  style: null,
  width: null,
};

const mapStateToProps = ({ auth: { isAdult, userInfo } }) => ({
  isLoggedIn: !!userInfo,
  isAdult: !!isAdult,
});

const mapDispatchToProps = dispatch => ({
  setIsAdult: () => dispatch(replaceIsAdult(true)),
});

export const Image = withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ImageBase),
);
