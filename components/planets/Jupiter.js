import Planet from './Planet';

import Sagittarius from '../zodiac/Sagittarius';
import Pisces from '../zodiac/Pisces';
import Cancer from '../zodiac/Cancer';
import Gemini from '../zodiac/Gemini';
import Virgo from '../zodiac/Virgo';
import Capricorn from '../zodiac/Capricorn';

class Jupiter extends Planet {
  name = 'Jupiter';
  static index = 6;
  static day = 'Thursday';
  static hourOrder = 1;
  static rulership = [Sagittarius, Pisces];
  static exaltation = Cancer;
  static detriment = [Gemini, Virgo];
  static fall = Capricorn;

  ReactSymbol (props) {
    return (
      <symbol id="Jupiter-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m4.745134,50.692204c0,0 -0.150799,-47.659749 31.570227,-47.836521c44.703903,-0.248868 -12.652168,71.817963 -12.652168,71.817963l72.298172,-0.602303" fill="transparent"/>
          <path d="m74.753952,16.831896l0,78.205534"/>
        </g>
      </symbol>
    );
  }
}


export default Jupiter;
