import { Component } from 'preact';

import Sign from './Sign';
import Air from '../elements/Air';

class Sagittarius extends Sign {
  static index = 9;
  static element = Air;

  ReactSymbol (props) {
    return (
      <symbol id="Sagittarius-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m4.995347,95.038979l89.237304,-92.124077"/>
          <path d="m94.232651,2.914901l0,44.052193"/>
          <path d="m94.232651,2.914901l-44.052143,0"/>
          <path d="m34.854752,31.767036l31.149742,31.151409"/>
        </g>
      </symbol>
    );
  }
}
export default Sagittarius;
