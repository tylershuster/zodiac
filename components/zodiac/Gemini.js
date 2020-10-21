import { Component } from 'preact';

import Sign from './Sign';
import Fire from '../elements/Fire';

class Gemini extends Sign {
  static index = 3;
  static element = Fire;

  ReactSymbol (props) {
    return (
      <symbol id="Gemini-symbol" viewBox="0 0 100 100">
        <g>
           <path d="m98.945709,0.099335c0,0 -21.206909,20.761047 -49.43948,20.636677m-49.439412,-20.636677c0,0 21.207336,20.761047 49.439412,20.636677"/>
           <path d="m99.352867,99.015289c0,0 -21.206917,-20.761047 -49.43948,-20.636673m-49.439701,20.636673c0,0 21.207362,-20.761047 49.439701,-20.636673"/>
           <path d="m29.889423,17.462967l0,64.425941"/>
           <path d="m69.951988,17.214342l0,64.426054"/>
        </g>
      </symbol>
    );
  }
}

export default Gemini;
