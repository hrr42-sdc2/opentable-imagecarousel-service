import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import Icon from './Icon.jsx';
import Button from './Button.jsx';
import { containsClass } from './utils/classNames.js';
import {classToggle } from './utils/classNames';

const ZOOM_STEP = 1.10;
const [MAX_ZOOM_SIZE, MIN_ZOOM_SIZE] = [Math.pow(ZOOM_STEP, 30), Math.pow(1 / ZOOM_STEP, 10)];

const transitionTime = 300;
const transitionDelta = 50;
export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.resetImageInitialState = this.resetImageInitialState.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.canMoveToLeft = this.canMoveToLeft.bind(this);
    this.canMoveToRight = this.canMoveToRight.bind(this);
    this.toggleControls = this.toggleControls.bind(this);
    this.heartPopup = this.heartPopup.bind(this);
    this.showHeartPopup = this.showHeartPopup.bind(this);
    this.closeHeartPopup = this.closeHeartPopup.bind(this);
    this.state = {
      selectedImageIndex: this.props.selectedImage,
      direction: 'none',
      showModal: false,
      loader: true,
      positionX: 0,
      positionY: 0,
      width: 0,
      height: 0,
      boxWidth: 0,
      boxHeight: 0
    };
  }

  componentDidMount() {
    this.resetImageInitialState(this.props.images[this.state.selectedImageIndex]);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleLeftClick() {
    if (this.canMoveToLeft()) {
      this.setState({
        selectedImageIndex: (this.state.selectedImageIndex - 1),
        direction: 'left'
      });
    }
  }

  handleRightClick() {
    if (this.canMoveToRight()) {
      this.setState({
        selectedImageIndex: (this.state.selectedImageIndex + 1),
        direction: 'right'
      });
    }
  }

  canMoveToLeft() {
    return (this.state.selectedImageIndex > 0);
  }

  canMoveToRight() {
    return (this.state.selectedImageIndex < (this.props.images.length - 1));
  }

  heartPopup(styles) {
    let tableStyles = {
      position: 'absolute',
      top: '18%',
      left: '10%',
      borderCollapse: 'separate',
      borderSpacing: '0 10px'
    };
    let buttonStyles = {
      fontFamily: 'Josefin Sans, sans-serif',
      fontSize: '17px',
      fontWeight: '300',
      borderRadius: '5px',
      color: 'white',
      backgroundColor: '#00bfff',
      width: `${this.state.width * 0.55}px`,
      height: `${this.state.width * 0.08}px`
    };

    if (!this.state.showModal) { return null; }
    return (
      <div className= 'modal-window-container' style={styles}>
        <table style={tableStyles}>
          <tr>
            <button style={buttonStyles} onClick={this.closeHeartPopup}>I love this restaurant !</button>
          </tr>
          <tr>
            <button style={buttonStyles} onClick={this.closeHeartPopup}>I don't like this restaurant !</button>
          </tr>
          <tr> </tr>
          {/* style={{align: 'center', color: '#00bfff'}} */}
          <tr style={{textAlign: 'center', color: '#00bfff'}} onClick={this.closeHeartPopup}>
            Cancel
          </tr>
        </table>
      </div>
    );
  }

  showHeartPopup() {
    this.setState({
      showModal: true
    });
  }

  closeHeartPopup() {
    this.setState({
      showModal: false
    });
  }

  toggleControls() {
    classToggle(this.refs.container, 'hide-controls');
  }

  resetImageInitialState(props) {
    let img = new Image();
    let _this = this;
    img.onload = function() {
      var borderWidth = Math.round(document.body.offsetWidth / 3.3);
      _this.setState({
        loader: false,
        positionX: borderWidth * 0.06,
        positionY: 10,
        width: (borderWidth * 0.87),
        height: (borderWidth * 0.87),
        boxWidth: borderWidth,
        boxHeight: borderWidth * 0.87
      });
    };
    img.src = props.src;
  }

  handleWindowResize() {
    this.resetImageInitialState(this.props.images[this.state.selectedImageIndex]);
  }

  render() {
    let [props, state] = [this.props, this.state];
    let background = `url(${props.images[this.state.selectedImageIndex].src})`;
    let image = props.images[state.selectedImageIndex];
    let loader;
    let leftButton;
    let rightButton;
    const transitionName = 'lightbox-transition-image';
    if (state.loader) {
      background = 'none';
      loader = (
        <div className='lightbox-loader'>
          <Icon icon="spinner" size={ 58 } />
        </div>
      );
    }
    if (this.canMoveToLeft()) {
      leftButton = (
        <div className='lightbox-btn-left'>
          <Button icon="left-arrow" onClick={this.handleLeftClick} width={60} height = {45} hasRipple={ true } />
        </div>
      );
    }
    if (this.canMoveToRight()) {
      rightButton = (
        <div className='lightbox-btn-right'>
          <Button icon="right-arrow" onClick={this.handleRightClick} width={60} height = {45} hasRipple={ true } />
        </div>
      );
    }
    let browserWidth = document.body.offsetWidth;
    let containerStyles = {
      position: 'fixed',
      top: '40px',
      left: `${(browserWidth - Math.ceil(state.boxWidth / 0.87) - 100) / 2}px`,
      width: `${state.boxWidth}px`,
      height: `${state.boxHeight}px`
    };
    let styles = {
      height: '100%',
      backgroundImage: background,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${state.width}px ${state.height}px`,
      backgroundPosition: `${state.positionX}px ${state.positionY}px`,
    };

    let modalStyles = {
      backgroundColor: 'white',
      position: 'absolute',
      top: '30%',
      left: `${(browserWidth - Math.ceil(state.boxWidth / 0.345)) / 2}px`,
      width: `${state.boxWidth * 0.6}px`,
      height: `${state.boxHeight * 0.4}px`,
      borderRadius: '5px'
    };

    return (
      <div className='lightbox-backdrop' ref='container'>
        <div className='lightbox-btn-close'>
          <Button icon="close" onClick={props.toggleLightbox} width={34} height={34} hasRipple={ true } />
        </div>
        <CSSTransitionGroup transitionAppear={true}
          transitionAppearTimeout={transitionTime}
          transitionEnterTimeout={transitionTime}
          transitionLeaveTimeout={transitionTime}
          transitionName={ {
            enter: `${transitionName}-enter-${state.direction}`,
            enterActive: `${transitionName}-enter-${state.direction}-active`,
            leave: `${transitionName}-leave-${state.direction}`,
            leaveActive: `${transitionName}-leave-${state.direction}-active`,
            appear: `${transitionName}-appear`,
            appearActive: `${transitionName}-appear-active`
          } }>
          <div className='lightbox-content-center'>
            <div className='lightbox-image-container' ref='container' style = {containerStyles}>
              {leftButton}
              <div className={'lightbox-image' + (state.moving ? ' moving' : '')} style={styles}>
                {loader}
              </div>
              <div className='lightbox-title-content'>
                <div className='lightbox-title'>
                  {image.photoTitle}
                  <span style={{fontFamily: 'Josefin Sans, sans-serif', fontWeight: '300'}}>{' ' + image.photoDate}</span>
                </div>
                <div className='lightbox-description'>
                  {image.photoDescription}
                </div>
                <div className='lightbox-btn-heart' onClick = {() => { this.showHeartPopup(); }}>
                  <Icon icon={'pet'} width={25} height={25}>
                    {/* <circle cx="12" cy="12" r="6" fill='none'/> */}
                  </Icon>
                </div>
              </div>
              {this.heartPopup(modalStyles)}
              {rightButton}
            </div>
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}
