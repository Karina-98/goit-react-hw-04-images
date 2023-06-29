import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getIMG } from './getIMG/getIMG';
import { Loader } from './Loader/Loader';
import { ErrorCard } from './Error/Error';
import { ButtonLoardMore } from './LoadMore/LoadMore.styled';
import { ModalIMG } from './Modal/Modal';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    textContext: '',
    imgs: [],
    status: STATUS.IDLE,
    error: null,
    currentPage: 1,
    totalPage: 0,
    showModal: false,
    largeImageURL: null,
  };

  componentDidMount() {}

  async componentDidUpdate(_, prevState) {
    const { textContext, currentPage } = this.state;
    if (
      prevState.textContext !== textContext ||
      prevState.currentPage !== currentPage
    ) {
      await this.fetchIMG();
    }
  }

  fetchIMG = async () => {
    this.setState({ status: STATUS.PENDING });
    try {
      const { textContext, currentPage } = this.state;
      const data = await getIMG(textContext, currentPage);
     
      //  await this.setState({ imgs: data.hits });

      if (data.hits.length === 0) {
        throw new Error('No matches found');
      } else {
        // const normalizedImages = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => {
        //   return { id, tags, webformatURL, largeImageURL };
        // });
        const data = await getIMG(textContext, currentPage);
        await this.setState((prevState) => ({
          imgs: [...prevState.imgs, ...data.hits],
          status: STATUS.RESOLVED,
          totalPage: Math.ceil(data.totalHits / 12),
        }));
      }
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.REJECTED });
    } finally {
      this.setState({ status: STATUS.RESOLVED });
    }
  };

  handelTextContext = textContext => {
    this.setState({ textContext, imgs: [], currentPage: 1 });
  };

  handleLoardMore = () => {
   
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  onOpenModal = largeUrl => {
    this.toggleModal();
    this.setState({ largeImageURL: largeUrl });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      imgs,
      error,
      status,
      currentPage,
      totalPage,
      textContext,
      showModal,
      largeImageURL,
    } = this.state;
    const loading = status === STATUS.PENDING;
    const buttonSeeLoardMore =
      imgs.length > 0 && currentPage !== totalPage && !loading;

    return (
      <>
        <Searchbar handelTextContext={this.handelTextContext} />

        {status === STATUS.PENDING && <Loader />}

       
          <ImageGallery
            textContext={textContext}
            imgs={imgs}
            onOpenModal={this.onOpenModal}
          />
    

        {buttonSeeLoardMore && (
          <ButtonLoardMore
            type="button"
            disabled={status === STATUS.PENDING ? true : false}
           onClick={this.handleLoardMore}
          >
            {status === STATUS.PENDING ? 'Loading...' : 'Loard More'}
          </ButtonLoardMore>
        )}

        {showModal && (
          <ModalIMG
            largeImageURL={largeImageURL}
            tag={imgs.tags}
            closeModal={this.toggleModal}
          />
        )}

        {status === STATUS.REJECTED && <ErrorCard>{error}</ErrorCard>}
      </>
    );
  }
}
