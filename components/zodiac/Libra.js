import { Component } from 'preact';

import Sign from './Sign';
import Fire from '../elements/Fire';

class Libra extends Sign {
  static index = 7;
  static element = Fire;

  ReactSymbol (props) {
    return (
      <symbol id="Libra-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m2.201207,72.429062l94.889453,0"/>
          <path d="m96.837898,51.033672l-34.155224,0c9.19521,-5.730053 20.288639,-34.731346 -12.844475,-34.731346m-47.000156,34.731346l34.155448,0c-9.195671,-5.730053 -20.288866,-34.731346 12.844707,-34.731346"/>
        </g>
      </symbol>
    );
  }
}

export default Libra;
