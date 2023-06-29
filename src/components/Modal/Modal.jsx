import { Component } from 'react';
import { Modal, Overlay } from './Modal.styled';

export class ModalIMG extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
   
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
   
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tag } = this.props;
    return (
      <>
        <Overlay onClick={this.handleBackdropClick}>
          <Modal>
            <img src={largeImageURL} alt={tag} onClick={e => e.stopPropagation()}/>
          </Modal>
        </Overlay>
      </>
    );
  }
}
