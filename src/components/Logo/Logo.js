import React from 'react';
import Tilt from 'react-tilt';
import brain from '../../assets/brain.png'
import './Logo.css'

const Logo = () => (
  <div className="ma4 mt0">
    <Tilt
      className="Tilt br2 shadow-2"
      options={{ max: 75}}
      style={{height: 100, width: 100 }}
      perspective={1000}
    >
      <div className="Tilt-inner pointer pa3">
        <img style={{paddingTop: '5px'}} src={brain} alt="brain"/>
      </div>
    </Tilt>
  </div>
);

export default Logo;
