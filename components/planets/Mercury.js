import Planet from './Planet';

import Gemini from '../zodiac/Gemini';
import Virgo from '../zodiac/Virgo';
import Sagittarius from '../zodiac/Sagittarius';
import Pisces from '../zodiac/Pisces';

class Mercury extends Planet {
  name = 'Mercury';
  static index = 2;
  static day = 'Wednesday';
  static hourOrder = 5;
  static rulership = [Gemini, Virgo];
  static exaltation = Virgo;
  static detriment = [Sagittarius, Pisces];
  static fall = Pisces;

  ReactSymbol (props) {
    return (
      <symbol id="Mercury-symbol" viewBox="0 0 100 100">
        <g>
          <path d="M0,-50 a1,1 0 0,0 100,0" fill="transparent" />
          <circle r="50" cx="50" cy="50" fill="transparent" />
          <line x1="50" x2="50" y1="100" y2="150" />
          <line x1="19" x2="81" y1="125" y2="125" />
        </g>
      </symbol>
    );
  }
}

export default Mercury;
