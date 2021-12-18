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
    .then(data => data.hits);
}

export default fetchImages;
