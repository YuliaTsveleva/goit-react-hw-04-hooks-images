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

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [imageName]);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    console.log('before fetch', 'page', page, 'images', images);

    setStatus('pending');
    // setTimeout(() => {
    fetchImages(imageName, page)
      .then(data => {
        const newImages = data.map(image => {
          return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          };
        });

        console.log('images', imageName, page, images);
        console.log('newImages', imageName, page, newImages);

        setImages(prev => [...prev, ...newImages]);
        setLoading(false);
        setStatus('resolved');

        if (newImages.length === 0) {
          return toast.error('No images matching your request!');
        }
        if (images.length > 0 && newImages.length === 0) {
          return toast.info('No more images matching your request!');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    // }, 1000);
    // }

    console.log('after fetch', 'page', page, 'images', images);

    return () => {
      console.log('finished use effect', 'images', images);
    };
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
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' && <PreView />}

      {status === 'pending' && <Loader />}

      {status === 'rejected' && <ErrorView message={error.message} />}

      {status === 'resolved' && (
        <>
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
          {showModal && (
            <Modal
              toClose={closeModal}
              src={modalUrl}
              alt={modalAlt}
              isShow={showModal}
            />
          )}
          {images.length > 0 && !loading && <Button loadMore={loadMore} />}
          {/* {loading && <Loader />} */}
        </>
      )}
    </>
  );

  // }
}
