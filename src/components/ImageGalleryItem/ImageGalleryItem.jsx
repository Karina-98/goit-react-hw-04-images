
import { ImageGalleryIMG, ImageGalleryLi } from "./ImageGalleryItem.styled"

import PropTypes from 'prop-types';

export const ImageGalleryItem =({onOpenModal,img})=>{

    return  <ImageGalleryLi><ImageGalleryIMG src={img.webformatURL} alt={img.tags} onClick={onOpenModal}/>
    
    </ImageGalleryLi>}

ImageGalleryItem.propTypes = {
    img: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };