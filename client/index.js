/* eslint-disable func-style */
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/Gallery.jsx';
import { photos } from './photos.js';
import $ from 'jquery';

const restaurantid = 1;

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
      url: `/restaurantid/${restaurantid}`,
      success: (data) => {
        console.log('retrieve data successfully', data);
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
