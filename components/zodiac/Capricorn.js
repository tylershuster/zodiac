import { Component } from 'preact';

import Sign from './Sign';
import Earth from '../elements/Earth';

class Capricorn extends Sign {
  static index = 10;
  static element = Earth;

  ReactSymbol (props) {
    return (
      <symbol id="Capricorn-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m2.11812,10.061348c27.263411,-0.338228 26.581776,22.51186 26.695357,67.200981"/>
          <path d="m25.519136,27.08362c0,0 9.581003,-21.972871 23.739519,-14.948321c15.948574,7.9164 -2.58791,36.538499 9.089848,53.590493c19.274254,28.146286 48.47757,17.226776 34.740036,-0.851135c-16.781479,-22.080624 -22.130135,23.452255 -53.129349,22.638222"/>
        </g>
      </symbol>
    );
  }
}

export default Capricorn;
