import { Component } from 'preact';

import Sign from './Sign';
import Air from '../elements/Air';

class Leo extends Sign {
  static index = 5;
  static element = Air;

  ReactSymbol (props) {
    return (
      <symbol id="Leo-symbol" viewBox="0 0 100 100">
        <g>
          <circle r="19.641655" cy="52.976876" cx="24.868014" />
          <path d="m40.867535,40.879715c-15.089096,-10.535864 -18.094122,-31.448014 7.154751,-37.72438c25.120659,-6.245236 47.087555,24.190424 11.70628,76.355965c-14.096519,20.775864 19.772114,27.056145 32.779621,3.122612"/>
        </g>
      </symbol>
    );
  }
}

export default Leo;
