import { Component } from 'preact';

import Sign from './Sign';
import Water from '../elements/Water';

class Scorpio extends Sign {
  static index = 8;
  static element = Water;

  ReactSymbol (props) {
    return (
      <symbol id="Scorpio-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m1.745864,3.201298c22.184224,0.658661 16.566174,81.024098 15.989943,92.08968"/>
          <path d="m14.134487,18.352428c13.829056,-11.858186 14.693363,-23.322115 25.065308,-12.78101c10.371513,10.541106 5.762302,87.349434 5.762302,87.349434"/>
          <path d="m43.352737,18.50226c13.829212,-11.858186 14.693638,-23.322114 25.06517,-12.781009c10.371902,10.541105 -13.722755,89.195085 27.107903,88.008096l-5.113197,-6.341225"/>
          <path d="m95.52581,93.729347l-6.167305,5.647064"/>
        </g>
      </symbol>
    );
  }
}

export default Scorpio;
