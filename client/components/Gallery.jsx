import React, { useState, useLayoutEffect, useRef, useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import Photo, { photoPropType } from './Photo.jsx';
import { computeColumnLayout } from './layouts/columns';
import Container from './Container.jsx';
import BodyPortal from './BodyPortal.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      showLightbox: false,
      selectedImage: 0
    };
    this.updateContainerWidth = this.updateContainerWidth.bind(this);
    this.toggleLightbox = this.toggleLightbox.bind(this)
  }

  componentDidMount() {
    this.updateContainerWidth();
  }

  updateContainerWidth() {
    let animationFrameID = null;
    const observer = new ResizeObserver(entries => {
      const newWidth = entries[0].contentRect.width;
      if (this.state.containerWidth !== newWidth) {
        //window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
        animationFrameID = window.requestAnimationFrame(() => {
          this.setState({
            containerWidth: Math.floor(newWidth)
          });
        });
      }
    });
    observer.observe(document.getElementById('lightbox-container'));
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameID);
    };
  }

  toggleLightbox(idx) {
    this.setState({
      showLightbox: !this.state.showLightbox,
      selectedImage:idx
    })
  }

  render() {
    const width = this.state.containerWidth - 1;
    let thumbs = computeColumnLayout({ containerWidth: width, columns:this.props.columns, photos: this.props.images});
    let images = thumbs.map((thumb, index) => {
      const { left, top, ...photo } = thumb;
      return Photo({
        left,
        top,
        key: thumb.key || thumb.src,
        index,
        toggleLightbox: this.toggleLightbox,
        photo,
      });
    });
    let container;
    if (this.state.showLightbox)
      container = (
        <BodyPortal>
          <Container
            images={this.props.images}
            toggleLightbox={this.toggleLightbox}
            selectedImage={this.state.selectedImage}
          />
        </BodyPortal>
      )

    return (
      <div id='lightbox-container'>
        {images}
        {container}
      </div>
    )
    }
}

export default Gallery;