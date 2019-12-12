/* eslint-disable func-style */
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/Gallery.jsx';
import { photos } from './photos.js';
import $ from 'jquery';

let params = (new URL(document.location)).searchParams;
let restaurantid = parseInt(params.get('restaurantid')) || 1;

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
        this.setState({
          photos: JSON.parse(data)
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h4 id = "gallery-title"> 100 Photos</h4>
        <Gallery images={this.state.photos} columns = {4}/>
      </div>
    );
  }

}

document.getElementById('imageCarousel-session').style.cursor = 'pointer';

ReactDOM.render(<App />, document.getElementById('imageCarousel-session'));
