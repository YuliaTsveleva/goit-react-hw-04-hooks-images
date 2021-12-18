import { useState } from 'react';
import './App.css';
import Searchbar from './Components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './Components/ImageGallery/ImageGallery';

export default function App() {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} />
      <ToastContainer autoClose="3000" position="top-left" theme="colored" />
    </div>
  );
}
