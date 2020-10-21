import Planet from './Planet';

import Scorpio from '../zodiac/Scorpio';

class Pluto extends Planet {
  name = 'Pluto';
  static index = 10;
  static rulership = Scorpio;

  ReactSymbol (props) {
    return (
      <symbol id="Pluto-symbol" viewBox="0 0 100 100">
        <g>
          <path d="M0,0 A50,62 0 0 0 100,0 " fill="none"></path>
          <line x2="50" x1="50" y2="138" y1="62"></line>
          <line x2="81" x1="19" y2="100" y1="100"></line>
          <circle cx="50" r="19" fill="transparent" cy="19"></circle>
        </g>
      </symbol>
    );
  }
}


export default Pluto;
