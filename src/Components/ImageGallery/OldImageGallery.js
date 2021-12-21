import React, { Component } from 'react';
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

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    loading: false,
    showModal: false,
    modalUrl: '',
    modalAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.imageName;
    const newQuery = this.props.imageName;
    if (prevQuery !== newQuery) {
      this.setState({
        status: 'pending',
        page: 1,
        images: [],
      });
      this.fetchGallery(1);
    }
  }

  toSetPage = () => {
    this.setState(prevState => {
      if (this.state.images.length > 1) {
        return { page: prevState.page };
      }
    });
  };

  loadMore = () => {
    this.setState({ loading: true });
    this.toSetPage();
    this.fetchGallery(this.state.page);
    this.toSmoothScroll();
  };

  fetchGallery = page => {
    const newQuery = this.props.imageName;
    // setTimeout(() => {
    fetchImages(newQuery, page)
      .then(data => {
        const images = data.map(image => {
          return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          };
        });

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            status: 'resolved',
            page: prevState.page + 1,
            loading: false,
          };
        });
        if (this.state.images.length === 0) {
          return toast.error('No images matching your request!');
        }
        if (this.state.images.length > 0 && images.length === 0) {
          return toast.info('No more images matching your request!');
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
    // }, 1000);
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleSelectImage = e => {
    const targetIndex = this.state.images.findIndex(
      image => image.id === +e.target.id,
    );
    const targetImage = this.state.images[targetIndex];
    this.setState({
      modalUrl: targetImage.largeImageURL,
      modalAlt: targetImage.tags,
    });
    this.openModal();
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalUrl: '',
      modalAlt: '',
    });
  };

  toSmoothScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  render() {
    const { images, error, status, loading, showModal, modalUrl, modalAlt } =
      this.state;

    if (status === 'idle') {
      return <PreView />;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images &&
              images.map(image => (
                <ImageGalleryItem
                  key={nanoid()}
                  id={image.id}
                  src={image.webformatURL}
                  alt={image.tags}
                  onClick={this.handleSelectImage}
                />
              ))}
          </ul>
          {showModal && (
            <Modal
              toClose={this.closeModal}
              src={modalUrl}
              alt={modalAlt}
              isShow={showModal}
            />
          )}
          {images.length > 0 && !loading && <Button loadMore={this.loadMore} />}
          {loading && <Loader />}
        </>
      );
    }
  }
}

export default ImageGallery;

useEffect(() => {
  setImages([]);
  setPage(1);
}, [imageName]);

// переписать
useEffect(() => {
  if (!imageName) {
    return;
  }
  setStatus('pending');
  // setImages([]);
  // setPage(1);
  // fetchImages(1);
  // console.log('page before fetch', page);
  // function fetchGallery(page) {
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

      console.log('images', images);
      console.log('newImages', newImages);
      setImages(prev => [...prev, ...newImages]);

      setLoading(false);
      setStatus('resolved');
      // setPage(prevPage => prevPage + 1);

      if (newImages.length === 0) {
        return toast.error('No images matching your request!');
      }
      if (images.length > 0 && newImages.length === 0) {
        return toast.info('No more images matching your request!');
      }
    })
    .then(newImages => {})
    .catch(error => {
      setError(error);
      setStatus('rejected');
    });
  // }, 1000);
  // }
}, [imageName, page]);

const toSetPage = () => {
  if (images.length > 1) {
    // console.log('page from toSetPage', page);
    return setPage(prev => prev + 1);
  }
};
