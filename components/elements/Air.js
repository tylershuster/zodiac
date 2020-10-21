import AlchemicalElement from './Element';

class Air extends AlchemicalElement {
  static color = '#FFFFFF';
  static corner = ['upper', 'left'];

  ReactSymbol (props) {
    return (
      <symbol id="Air-symbol" viewBox="-50 -50 100 100">
        <polygon points="0,-50 50,50 -50,50" fill="transparent" stroke="currentColor" />
      </symbol>
    );
  }
}

export default Air;
