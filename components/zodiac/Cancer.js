import { Component } from 'preact';

import Sign from './Sign';
import Water from '../elements/Water';

class Cancer extends Sign {
  static index = 4;
  static element = Water;

  ReactSymbol (props) {
    return (
      <symbol id="Cancer-symbol" viewBox="0 0 100 100">
        <g>
         <circle fill="transparent"  r="17.13961" cy="40.024886" cx="17.306649"/>
         <path d="m97.085907,47.790466c-3.184853,-33.350643 -77.143837,-69.971338 -96.918859,-8.754749"/>
         <path d="m0.277474,53.371021c3.184835,33.350643 77.144271,69.97134 96.91915,8.754753"/>
         <circle fill="transparent" r="17.13961" cy="60.395173" cx="80.269356" />
        </g>
      </symbol>
    );
  }
}


export default Cancer;
