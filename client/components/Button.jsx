import React from 'react';
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

