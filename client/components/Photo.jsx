import React from 'react';

const imgWithClick = { cursor: 'pointer' };

const Photo = ({ index, toggleLightbox, photo, margin, top, left, key }) => {
  const imgStyle = { margin: margin, display: 'block' };
  imgStyle.position = 'absolute';
  imgStyle.left = left;
  imgStyle.top = top;
  let styles = {
    position: 'relative',
    width: photo.width,
    height: photo.height,
    top: top,
    left: left
  };
  if (index === 8) {
    return (
      <div>
        <img
          key={key}
          style={imgStyle}
          {...photo}
        />
        <div className = 'pictures-container' style = {styles} onClick = {() => { toggleLightbox(index); }}>
          <div className='container-title'>
            + 91 more
          </div>
        </div>
      </div>

    );
  }
  return (
    <img
      key={key}
      style={imgStyle}
      {...photo}
      onClick = {() => { toggleLightbox(index); }}
    />
  );
};


export default Photo;
