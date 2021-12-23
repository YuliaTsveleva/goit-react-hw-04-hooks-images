import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = '24048830-4cc4486dcdd2cd17ebea2a9c8';

function fetchImages(newQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${newQuery}&page=${page}&&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`No image with name ${newQuery}`));
    })
    .then(data => {
      const newImages = data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        };
      });
      let total = data.totalHits;
      if (newImages.length === 0) {
        return toast.error('No images matching your request!');
      }
      return { newImages, total };
    });
}

export default fetchImages;
