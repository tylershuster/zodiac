import ChartElement from '../ChartElement';

import { coordsFromDegree, rangeDegree, filterAngle } from '../../assets/utilities';

class Sign extends ChartElement {
  index;
  name;
  boundary;
  element;

  setBoundary(boundary) {
    this.boundary = boundary;
    return this;
  }

  coordsFromDegree() {
    const degree = this.degree;
    const { x, y } = coordsFromDegree({ degree, distance: this.boundary - this.size, width: this.canvasWidth, height: this.canvasHeight });
    return { x, y };
  }

  /**
   * Returns true if this zodiac sign has the given planet in it
   * @param  {Planet}  planet The planet to test
   * @return {Boolean}        Whether or not the planet lies in the sign
   */
  hasPlanet(planet) {
    return planet.degree >= this.degree - 15 && planet.degree < this.degree + 15;
  }

  get degree() {
    return filterAngle(30 * (this.constructor.index - 1) + 15);
  }

  get Element() {
    return (props => {
      const { x, y } = this.coordsFromDegree();
      return <use
        href={`#${this.name}-symbol`}
        transform={`rotate(${this.degree + 90} ${x} ${y})`}
        stroke={this.color}
        fill="transparent"
        stroke-width={100 / this.size}
        width={this.size}
        height={this.size}
        x={x - (this.size / 2)}
        y={y - (this.size / 2)}
        {...props}
      />;
    })
  }

  get Line() {
    const offset = 0;
    const degree = this.degree - 15;
    const { x, y } = coordsFromDegree({ degree, distance: this.boundary, offset, width: this.canvasWidth, height: this.canvasHeight });
    return ({ color, ...props }) => (
      <line class="sign-boundary" x1="0" y1="0" x2={x} y2={y} stroke={color} {...props} />
    );
  }
}


export default Sign;
