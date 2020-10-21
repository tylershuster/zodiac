import AlchemicalElement from './Element';

class Earth extends AlchemicalElement {
  static color = '#BF7839';
  static corner = ['lower', 'right'];

  ReactSymbol (props) {
    return (
      <symbol id="Earth-symbol" viewBox="-50 -50 100 100">
        <polygon points="-50,-50 50,-50 0,50" fill="transparent" stroke="currentColor" />
        <line x1="-50" y1="0" x2="50" y2="0" stroke="currentColor" />
      </symbol>
    );
  }
}


export default Earth;
