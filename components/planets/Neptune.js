import Planet from './Planet';

import Pisces from '../zodiac/Pisces';

class Neptune extends Planet {
  name = 'Neptune';
  static index = 9;
  static rulership = Pisces;

  ReactSymbol (props) {
    return (
      <symbol id="Neptune-symbol" viewBox="0 0 100 100">
        <g>
          <path d="M0,0 A50,100 0 0 0 100,0" fill="transparent"></path>
          <line y1="0" x1="50" y2="150" x2="50"></line>
          <line x2="69" x1="50" y2="19" y1="0"></line>
          <line x2="119" x1="100" y2="19" y1="0"></line>
          <line y1="0" x1="0" y2="19" x2="19"></line>
          <line x2="31" x1="50" y2="19" y1="0"></line>
          <line x2="-19" x1="0" y2="19" y1="0"></line>
          <line y1="0" id="line3" x1="100" y2="19" x2="81"></line>
          <line x1="19" x2="81" y1="125" y2="125" />
        </g>
      </symbol>
    );
  }
}


export default Neptune;
