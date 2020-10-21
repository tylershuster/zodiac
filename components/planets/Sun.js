import Planet from './Planet';

import Leo from '../zodiac/Leo';
import Aries from '../zodiac/Aries';
import Aquarius from '../zodiac/Aquarius';
import Libra from '../zodiac/Libra';

class Sun extends Planet {
  name = 'Sun';
  static index = 4;
  static day = 'Sunday';
  static hourOrder = 3;
  static rulership = Leo;
  static exaltation = Aries;
  static detriment = Aquarius;
  static fall = Libra;

  ReactSymbol (props) {
    return (
      <symbol id="Sun-symbol" viewBox="-50 -50 100 100">
        <g>
          <circle r="50" cx="0" cy="0" fill="transparent" />
          <circle r="7" cx="0" cy="0" fill="currentColor" />
        </g>
      </symbol>
    );
  }
}


export default Sun;
