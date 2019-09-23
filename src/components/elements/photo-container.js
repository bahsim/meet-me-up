import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Image } from './Image';
import { ImageLightbox } from './image-lightbox';
import { DenyAuthDialog } from '../dialogs/DenyAuthDialog';
import { DenyPremiumDialog } from '../dialogs/DenyPremiumDialog';

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow-x: auto;
  padding-top: 20px
  padding-bottom: 20px

  @media (min-width: desktop) {
    flex-wrap: wrap;
    overflow: unset;
  }
`;

const PhotoContainerBase = ({
  isMine, isLoggedIn, isPremium, images, style, containerStyle,
}) => {
  const [isAuthDialogOpen, setAuthDialog] = useState(false);
  const [isPremiumDialogOpen, setPremiumDialog] = useState(false);

  const [lightBox, setLightBox] = useState({
    photoIndex: 0,
    isOpen: false,
  });

  const handleOnClick = (index) => {
    if (isMine || isLoggedIn && isPremium) {
      setLightBox({
        photoIndex: index,
        isOpen: true,
      });
    } else if (isLoggedIn && !isPremium) {
      setPremiumDialog(true);
    } else {
      setAuthDialog(true);
    }
  };

  return (
    <>
      <Container style={containerStyle}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            style={style}
            onClick={() => handleOnClick(index)}
          />
        ))}
      </Container>
      <ImageLightbox
        onClose={() => setLightBox({ photoIndex: 0, isOpen: false })}
        setIndex={index => setLightBox({ ...lightBox, photoIndex: index })}
        isOpen={lightBox.isOpen}
        photoIndex={lightBox.photoIndex}
        images={images}
      />
      <DenyAuthDialog
        isOpened={isAuthDialogOpen}
        onClose={() => setAuthDialog(false)}
        title="Для продолжения"
      />
      <DenyPremiumDialog
        isOpened={isPremiumDialogOpen}
        onClose={() => setPremiumDialog(false)}
        title="Для просмотра фотографий"
      />
    </>
  );
};
PhotoContainerBase.propTypes = {
  isMine: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isPremium: PropTypes.bool,
  images: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
  containerStyle: PropTypes.object,
};

PhotoContainerBase.defaultProps = {
  isMine: false,
  isLoggedIn: false,
  isPremium: false,
  containerStyle: null,
};

const mapStateToProps = ({ auth: { isPremium, userInfo } }) => ({
  isLoggedIn: !!userInfo,
  isPremium: !!isPremium,
});

export const PhotoContainer = connect(mapStateToProps)(PhotoContainerBase);
