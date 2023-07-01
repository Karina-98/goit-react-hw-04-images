import {  useEffect } from 'react';
import { Modal, Overlay } from './Modal.styled';


export const ModalIMG = ({closeModal, largeImageURL, tag}) => {
  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    return ()=> window.removeEventListener('keydown', handleKeyDown);
  })

 const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <>
      <Overlay onClick={handleBackdropClick}>
        <Modal>
          <img src={largeImageURL} alt={tag} onClick={e => e.stopPropagation()}/>
        </Modal>
      </Overlay>
    </>
  );
}