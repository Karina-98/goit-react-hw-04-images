import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from 'components/ImageGallery/ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imgs, onOpenModal }) => {

  return (
    
      <ImageGalleryUl>
        {imgs.map(img => (
          <ImageGalleryItem img={img} key={img.id} onOpenModal={() => onOpenModal(img.largeImageURL)}/>
        ))}
      </ImageGalleryUl>
 
  );
};

ImageGallery.propTypes = {
    imgs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  };
