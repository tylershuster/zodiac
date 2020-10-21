import SunCalc from 'suncalc';

import Planet from './Planet';

import { dFromPhase } from '../../assets/utilities';

import Cancer from '../zodiac/Cancer';
import Taurus from '../zodiac/Taurus';
import Capricorn from '../zodiac/Capricorn';
import Scorpio from '../zodiac/Scorpio';

class Moon extends Planet {
  name = 'Moon';
  static index = 1;
  static day = 'Monday';
  static hourOrder = 6;
  static rulership = Cancer;
  static exaltation = Taurus;
  static detriment = Capricorn;
  static fall = Scorpio;

  ReactSymbol (props) {
    const phase = SunCalc.getMoonIllumination(this.now).phase.toFixed(2);
    return (
      <g>
        <mask id="umbra">
          <rect x="-50" y="-50" height="200" width="200" fill="black" />
          <path d={dFromPhase(phase)} fill="white"/>
        </mask>
        <symbol id="Moon-symbol" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g>
            <path mask="url(#umbra)" d="m50,0 a20,20 0 1,1 0,100 a20,20 0 1,1 0,-100" fill="currentColor" stroke="currentColor"/>
            </g>
        </symbol>
      </g>
    );
  };
}


export default Moon;
