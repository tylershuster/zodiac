import { Component } from 'preact';

import Sign from './Sign';
import Air from '../elements/Air';

class Aries extends Sign {
  static index = 1;
  static element = Air;

  ReactSymbol (props) {
    return (
      <symbol id="Aries-symbol" viewBox="0 0 100 100">
        <path d="m98.224403,52.825031c0.049217,-1.838326 0.105148,-51.5689 -22.784996,-51.628528c-24.248909,-0.193903 -25.614758,98.49163 -25.614758,98.49163m-46.527728,-46.311321c-0.049406,-1.838211 -0.10545,-51.568785 22.784812,-51.628413c24.248913,-0.193903 23.742916,97.939734 23.742916,97.939734"/>
      </symbol>
    );
  }
}

export default Aries;
