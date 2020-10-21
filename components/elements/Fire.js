import AlchemicalElement from './Element';

class Fire extends AlchemicalElement {
  static color = '#FF0300';
  static corner = ['upper', 'right'];

  ReactSymbol (props) {
    return (
      <symbol id="Fire-symbol" viewBox="0 0 100 100">
        <polygon points="50,0 100,100 0,100" fill="transparent" stroke="currentColor" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" />
      </symbol>
    );
  }
}


export default Fire;
