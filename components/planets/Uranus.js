import Planet from './Planet';

import Aquarius from '../zodiac/Aquarius';

class Uranus extends Planet {
  name = 'Uranus';
  static index = 8;
  static rulership = Aquarius;

  ReactSymbol (props) {
    return (
      <symbol id="Uranus-symbol" viewBox="0 0 100 100">
        <g>
          <path d="M100,0 A19,50 0 0 0 100,100 " fill="none"></path>
          <path d="M0,100 A19,50 0 0 0 0,0 " fill="none"></path>
          <line x2="81" x1="19" y2="50" y1="50"></line>
          <line x2="50" x1="50" y2="81" y1="19"></line>
          <circle cx="50" r="19" fill="transparent" cy="100"></circle>
        </g>
      </symbol>
    );
  }
}


export default Uranus;
