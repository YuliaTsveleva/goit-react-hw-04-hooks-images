import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './Components/ImageGallery/ImageGallery';

export default function App() {
  return (
    <div className="App">
      <ImageGallery />
      <ToastContainer autoClose="3000" position="top-left" theme="colored" />
    </div>
  );
}
