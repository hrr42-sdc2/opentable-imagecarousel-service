import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';


export default class Button extends React.Component {
  render() {
    const props = this.props;
    let ripple;
    if (props.hasRipple) {
      ripple = <rect x="0" y="0" width="50%" height="100%" />;
    }
    return (
      <button className={`lightbox-btn ${ props.hasRipple ? 'lightbox-btn--ripple' : '' }`}
        onClick={ props.onClick.bind(this) }>
        <Icon icon={props.icon} width={props.width} height = {props.height}>
          { ripple }
        </Icon>
      </button>
    );
  }
}

Button.defaultProps = {
  selectedImage: 0,
  hasRipple: false,
  size: 24
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  hasRipple: PropTypes.bool,
  size: PropTypes.number
};
