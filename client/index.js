/* eslint-disable func-style */
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/Gallery.js';
import { photos } from './photos.js';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: photos
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/images',
      success: (data) => {
        this.setState({
          photos: JSON.parse(data)
        });
      }
    });
  }

  render() {
    return (
      <div id = 'gallery'>
        <Gallery images={this.state.photos} columns = {4}/>
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('app'));
