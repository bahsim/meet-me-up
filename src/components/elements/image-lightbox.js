import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

export const ImageLightbox = ({
  images,
  photoIndex,
  isOpen,
  setIndex,
  onClose,
}) => isOpen && (
  <Lightbox
    mainSrc={images[photoIndex]}
    nextSrc={images[(photoIndex + 1) % images.length]}
    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
    onCloseRequest={() => onClose()}
    onMovePrevRequest={() => setIndex((photoIndex + images.length - 1) % images.length)}
    onMoveNextRequest={() => setIndex((photoIndex + 1) % images.length)}
  />
);
