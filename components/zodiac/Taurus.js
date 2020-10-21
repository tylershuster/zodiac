import { Component } from 'preact';

import Sign from './Sign';
import Earth from '../elements/Earth';

class Taurus extends Sign {
  static index = 2;
  static element = Earth;

  ReactSymbol (props) {
    return (
      <symbol id="Taurus-symbol" viewBox="0 0 100 100">
        <g>
         <circle fill="transparent" cx="49.843463" cy="64.783612" r="34.362392"/>
         <path d="m99.6726,0.557417c-32.564148,-0.37404 -15.412109,30.112072 -49.59201,29.614645m-49.5916,-29.614645c32.563928,-0.37404 15.411888,30.112072 49.5916,29.614645"/>
        </g>
      </symbol>
    );
  }
}

export default Taurus;
