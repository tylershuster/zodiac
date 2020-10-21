import { Component } from 'preact';

import Sign from './Sign';
import Fire from '../elements/Fire';

class Aquarius extends Sign {
  static index = 11;
  static element = Fire;

  ReactSymbol (props) {
    return (
      <symbol id="Aquarius-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m4.665473,40.560616l27.667264,-19.191982l4.717911,18.579029l25.199871,-18.438635l2.131866,17.279318l25.062866,-16.544666l5.600647,16.142189"/>
          <path d="m4.260018,70.086853l27.667211,-19.191975l4.717943,18.579121l25.199944,-18.438839l2.131863,17.279499l25.06287,-16.544739l5.600655,16.142258"/>
        </g>
      </symbol>
    );
  }
}

export default Aquarius;
