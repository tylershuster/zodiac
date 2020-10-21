import { Component } from 'preact';

import Sign from './Sign';
import Water from '../elements/Water';

class Pisces extends Sign {
  static index = 12;
  static element = Water;

  ReactSymbol (props) {
    return (
      <symbol id="Pisces-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m13.64755,5.097727c29.480529,39.705488 22.381183,55.711603 0.842301,89.40225"/>
          <path d="m81.144402,4.571778c-29.480572,39.705596 -22.380829,55.711711 -0.842445,89.402366"/>
          <path d="m21.950235,48.87682l54.388731,0"/>
        </g>
      </symbol>
    );
  }
}

export default Pisces;
