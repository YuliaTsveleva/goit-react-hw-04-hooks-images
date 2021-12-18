import React, { Component } from 'react';
import './App.css';
import Searchbar from './Components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './Components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose="3000" position="top-left" theme="colored" />
      </div>
    );
  }
}

export default App;
