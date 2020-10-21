import Planet from './Planet';

import Taurus from '../zodiac/Taurus';
import Libra from '../zodiac/Libra';
import Pisces from '../zodiac/Pisces';
import Scorpio from '../zodiac/Scorpio';
import Aries from '../zodiac/Aries';
import Virgo from '../zodiac/Virgo';

class Venus extends Planet {
  name = 'Venus';
  static index = 3;
  static day = 'Friday';
  static hourOrder = 4;
  static rulership = [Taurus, Libra];
  static exaltation = Pisces;
  static detriment = [Scorpio, Aries];
  static fall = Virgo;

  ReactSymbol (props) {
    return (
      <symbol id="Venus-symbol" viewBox="-50 -50 100 100">
        <g>
          <circle r="50" cx="0" cy="0" fill="transparent" />
          <line x1="0" x2="0" y1="50" y2="100" />
          <line x1="-31" x2="31" y1="75" y2="75" />
        </g>
      </symbol>
    );
  }
}


export default Venus;
