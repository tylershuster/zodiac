import ephemeris from 'ephemeris';

import ChartElement from '../ChartElement';

import { coordsFromDegree, arcDegrees, filterAngle } from '../../assets/utilities';

import { Rulership, Exaltation, Detriment, Fall } from '../dignifications';

class Planet extends ChartElement {
  name;
  index;
  here;
  now;
  ReactSymbol;
  ReactElement;
  orbitStyle;
  orbitDistance;

  constructor(here, now) {
    super();
    this.index = this.constructor.index;
    this.day = this.constructor.day;
    this.hourOrder = this.constructor.hourOrder;
    this.rulership = this.constructor.rulership;
    this.exaltation = this.constructor.exaltation;
    this.detriment = this.constructor.detriment;
    this.fall = this.constructor.fall;
    this.here = here;
    this.now = now;
  }

  setDistanceOffset(distanceOffset) {
    this.distanceOffset = distanceOffset;
    return this;
  }

  setOrbitStyle(orbitStyle, orbitDistance) {
    this.orbitStyle = orbitStyle;
    this.orbitDistance = orbitDistance;
    return this;
  }

  coordsFromDegree() {
    return coordsFromDegree({ degree: this.degree, distance: this.distance, width: this.canvasWidth, height: this.canvasHeight });
  }

  ephemeris(date = false) {
    const elevation = 0;
    if(!date) date = this.now;
    const name = this.name.toLowerCase();
    return ephemeris.getPlanet(name, date, this.here.lat, this.here.lng, elevation).observed[name];
  }

  get Element() {
    return (props => {
      const { x, y } = this.coordsFromDegree();
      const filter = this.ruling ? 'rulership' :
      this.exalted ? 'exaltation' :
      this.deteriorated ? 'detriment' :
      this.fallen ? 'fall' : null;
      return (
        <g>
          <use
            transform={`rotate(${this.degree + 90} ${x} ${y})`}
            href={`#${this.name}-symbol`}
            x={x - (this.size / 2)}
            y={y - (this.size / 2)}
            width={this.size}
            height={this.size}
            stroke={this.color}
            stroke-width={100 / this.size}
            color={this.color}
            filter={filter ? `url(#${filter})` : null}
            {...props}
          />
        </g>
      );
    });
  }

  get Orbit() {
    return (props) => (
      <circle
        class="orbit"
        cx="0"
        cy="0"
        opacity={(this.index + 2) / 10 * .75}
        r={this.distance - (this.size / 2)}
        {...props}
      />
    );
  }

  get Trail() {
    const rotation = this.degree;
    // Calculate if planet is retrograde by going an hour into the future
    // and seeing which direction it's going
    const rotationTomorrow = filterAngle(this.ephemeris(this.now.clone().add(1, 'hours')).apparentLongitudeDd);
    const direction = rotation > rotationTomorrow
      ? 1
      : -1;
    const circumference = this.distance * Math.PI * 2;
    return (({length, ...props}) => {
      const offset = direction === -1
        ? (length - circumference)
        : (circumference - length);
      return <circle
        className="trail"
        transform={`rotate(${rotation + arcDegrees((this.size / 2) * direction , this.distance)} 0 0)`}
        cx="0"
        cy="0"
        opacity=".5"
        stroke="white"
        fill="transparent"
        color={this.color}
        r={this.distance}
        stroke-dasharray={circumference}
        stroke-dashoffset={offset}
      />
    });
  }

  get distance() {
    return this.orbitStyle === 'spheres'
      ? this.distanceOffset + (this.index * this.size)
      : this.orbitDistance;
  }

  get degree() {
    const ephemeris = this.ephemeris();
    return filterAngle(ephemeris.apparentLongitudeDd);
  }

  get ruling() {
    if(!this.rulership) return false;
    return Array.isArray(this.rulership)
      ? this.rulership.reduce((accumulator, sign) => sign.prototype.hasPlanet(this) ? true : accumulator, false)
      : this.rulership.prototype.hasPlanet(this);
  }

  get exalted() {
    if(!this.exaltation) return false;
    return Array.isArray(this.exaltation)
      ? this.exaltation.reduce((accumulator, sign) => sign.prototype.hasPlanet(this) ? true : accumulator, false)
      : this.exaltation.prototype.hasPlanet(this);
  }

  get deteriorated() {
    if(!this.detriment) return false;
    return Array.isArray(this.detriment)
      ? this.detriment.reduce((accumulator, sign) => sign.prototype.hasPlanet(this) ? true : accumulator, false)
      : this.detriment.prototype.hasPlanet(this);
  }

  get fallen() {
    if(!this.fall) return false;
    return Array.isArray(this.fall)
      ? this.fall.reduce((accumulator, sign) => sign.prototype.hasPlanet(this) ? true : accumulator, false)
      : this.fall.prototype.hasPlanet(this);
  }

}

export default Planet;
