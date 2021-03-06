import { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import ErrorView from '../ErrorView/ErrorView';
import Loader from '../Loader/Loader';
import PreView from '../PreView/PreView';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import fetchImages from '../../services/apiService';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [imageName, setImageName] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setStatus('pending');

    fetchImages(imageName, page)
      .then(data => {
        if (!data.newImages) {
          setStatus('idle');
          return;
        }

        setImages(prev => [...prev, ...data.newImages]);
        setStatus('resolved');
        setLoading(false);
        setTotal(data.total);

        const imagesRest = data.total - images.length - data.newImages.length;
        if (data.newImages.length && data.newImages.length >= imagesRest) {
          return toast.info('No more images matching your request!');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imageName, page]);

  const loadMore = () => {
    setLoading(true);
    setPage(prev => prev + 1);
    toSmoothScroll();
  };

  const toSmoothScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  const handleSelectImage = e => {
    const targetIndex = images.findIndex(image => image.id === +e.target.id);
    const targetImage = images[targetIndex];
    setModalUrl(targetImage.largeImageURL);
    setModalAlt(targetImage.tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalUrl('');
    setModalAlt('');
  };

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && <PreView />}
      <ul className={s.ImageGallery}>
        {images &&
          images.map(image => (
            <ImageGalleryItem
              key={nanoid()}
              id={image.id}
              src={image.webformatURL}
              alt={image.tags}
              onClick={handleSelectImage}
            />
          ))}
      </ul>
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <ErrorView message={error.message} />}
      {status === 'resolved' && (
        <>
          {showModal && (
            <Modal
              toClose={closeModal}
              src={modalUrl}
              alt={modalAlt}
              isShow={showModal}
            />
          )}
          {images.length > 0 && images.length < total && !loading && (
            <Button loadMore={loadMore} />
          )}
          {loading && <Loader />}
        </>
      )}
    </>
  );
}
