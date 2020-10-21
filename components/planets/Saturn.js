import Planet from './Planet';

import Capricorn from '../zodiac/Capricorn';
import Aquarius from '../zodiac/Aquarius';
import Libra from '../zodiac/Libra';
import Cancer from '../zodiac/Cancer';
import Leo from '../zodiac/Leo';
import Aries from '../zodiac/Aries';

class Saturn extends Planet {
  name = 'Saturn';
  static index = 7;
  static day = 'Saturday';
  static hourOrder = 0;
  static rulership = [Capricorn, Aquarius];
  static exaltation = Libra;
  static detriment = [Cancer, Leo];
  static fall = Aries;

  ReactSymbol (props) {
    return (
      <symbol id="Saturn-symbol" viewBox="0 0 100 100">
        <g>
          <path d="m14.571985,2.102997l0,87.390251"/>
          <path d="m4.932566,11.362606l19.151924,0"/>
          <path d="m14.571947,74.269493c0.253677,-47.561714 55.374762,-83.309032 64.938749,-47.178341c3.520821,12.923161 -10.153946,31.814167 -16.203957,49.273983c-5.394356,15.569237 6.664268,15.052856 27.87307,-0.823753" fill="transparent"/>
        </g>
      </symbol>
    );
  }
}


export default Saturn;
