import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar, } from './Searchbar/Searchbar';
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

export const App = ()=> {

  const [textContext, setTextContext] = useState('');
  const [imgs, setImgs] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(()=>{
if (textContext === '') return;

const fetchIMG = async () => {
  setStatus(STATUS.PENDING)
  try {
    const data = await getIMG(textContext, currentPage);
    if (data.hits.length === 0) {
      setStatus(STATUS.REJECTED)
      throw new Error('No matches found');
    } else {
      const data = await getIMG(textContext, currentPage);
      setImgs(prevImgs=>{return[...prevImgs, ...data.hits]});
      setStatus(STATUS.RESOLVED)
      setTotalPages(Math.ceil(data.totalHits / 12))
    }
  } catch (error) {
    setError(error.message)
    setStatus(STATUS.REJECTED)
  } finally {
    
  }
  
}
fetchIMG(); 

}, [textContext,currentPage])



const handelTextContext = textContext => {
  setTextContext(textContext)
  setImgs([])
  setCurrentPage(1)
};

const handleLoardMore = () => {
 setCurrentPage(prevCurrent=>{return prevCurrent + 1})
};

const onOpenModal = largeUrl => {
 toggleModal();
 setLargeImageURL(largeUrl)
};

const toggleModal = () => {
  setShowModal(!showModal)
}

const loading = status === STATUS.PENDING;
    const buttonSeeLoardMore =
      imgs.length > 0 && currentPage !== totalPages && !loading;


    return (
      <>
        <SearchBar handelTextContext={handelTextContext} />

        {status === STATUS.PENDING && <Loader />}

       
          <ImageGallery
            textContext={textContext}
            imgs={imgs}
            onOpenModal={onOpenModal}
          />
    

        {buttonSeeLoardMore && (
          <ButtonLoardMore
            type="button"
            disabled={status === STATUS.PENDING ? true : false}
           onClick={handleLoardMore}
          >
            {status === STATUS.PENDING ? 'Loading...' : 'Loard More'}
          </ButtonLoardMore>
        )}

        {showModal && (
          <ModalIMG
            largeImageURL={largeImageURL}
            tag={imgs.tags}
            closeModal={toggleModal}
          />
        )}

        {status === STATUS.REJECTED && <ErrorCard>{error}</ErrorCard>}
      </>
    );

        }

