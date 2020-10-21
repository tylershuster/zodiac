import Planet from './Planet';

import Aries from '../zodiac/Aries';
import Scorpio from '../zodiac/Scorpio';
import Capricorn from '../zodiac/Capricorn';
import Libra from '../zodiac/Libra';
import Taurus from '../zodiac/Taurus';
import Cancer from '../zodiac/Cancer';

class Mars extends Planet {
  name = 'Mars';
  static index = 5;
  static day = 'Tuesday';
  static hourOrder = 2;
  static rulership = [Aries, Scorpio];
  static exaltation = Capricorn;
  static detriment = [Libra, Taurus];
  static fall = Cancer;

  ReactSymbol (props) {
    return (
      <symbol id="Mars-symbol" viewBox="0 0 100 100">
        <g>
          <circle r="50" cx="50" cy="50" fill="transparent" />
          <line x1="85.36" x2="125" y1="14.64" y2="-25" />
          <line x1="125" x2="125" y1="-25" y2="14.64" />
          <line x1="85.36" x2="125" y1="-25" y2="-25" />
        </g>
      </symbol>
    );
  }
}


export default Mars;
