import React from 'react';
import PropTypes from 'prop-types';
import { icons } from './utils/iconConstants';

const Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox={'0 0 24 24'}>
    {
      props.children
    }
    {
      icons[props.icon].map(path => <path key={ path } d={ path }/> )
    }
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};


export default Icon;
