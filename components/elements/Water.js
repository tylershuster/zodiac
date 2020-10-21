import AlchemicalElement from './Element';

class Water extends AlchemicalElement {
  static color = '#4472ED';
  static corner = ['lower', 'left'];

  ReactSymbol (props) {
    return (
      <symbol id="Water-symbol" viewBox="0 0 100 100">
        <polygon points="0,0 100,0 50,100" fill="transparent" stroke="currentColor" />
      </symbol>
    );
  }

}

export default Water;
