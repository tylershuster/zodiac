import ChartElement from '../ChartElement';

import { filterAngle } from '../../assets/utilities';

class AlchemicalElement extends ChartElement {
  edgeOffset;

  constructor() {
    super();
    this.hasPlanet = this.hasPlanet.bind(this);
  }

  setEdgeOffset(edgeOffset) {
    this.edgeOffset = edgeOffset;
    return this;
  }

  hasPlanet(planet, Zodiac, index) {
    const x = this.x + ((this.size / 2) - (planet.size / 2));
    const y = this.y + (this.constructor.corner.includes('upper')
      ? (this.size + (planet.size * index * 2) + planet.size)
      : 0 - (this.size + (planet.size * index * 2))
    );
    const signSize = planet.size * .618;
    const signOffset = signSize * 2;
    const signX = x + (this.constructor.corner.includes('left')
      ? signSize + signOffset
      : signOffset * -1
    );
    const signY = y + (planet.size / 2) - (signSize / 2);
    const degree = (360 - planet.degree);
    const signIndex = Math.ceil(degree / 30) - 1;
    const sign = Zodiac[signIndex];
    const degreeOfSign = Math.floor(degree % 30);

    const textSize = signSize;
    const textOffset = textSize;
    const textX = x + (this.constructor.corner.includes('left')
      ? planet.size + signOffset + signSize
      : textOffset * -1
    );

    const textY = y + (planet.size / 2) - (textSize / 2);
    const textAnchor = (this.constructor.corner.includes('left')
      ? 'start'
      : 'end'
    );

    return (
      <g>
        <text
          fill={'transparent'}
          x={textX}
          y={textY}
          text-anchor={textAnchor}
          align-baseline="middle"
          font-size={textSize}
        >{degreeOfSign}</text>
        <use
          x={signX}
          y={signY}
          href={`#${sign.name}-symbol`}
          fill="transparent"
          stroke-width={100 / signSize}
          stroke={this.constructor.color}
          width={signSize}
          height={signSize}
        />
        <use
          href={`#${planet.name}-symbol`}
          width={planet.size}
          height={planet.size}
          stroke={this.constructor.color}
          color={this.constructor.color}
          stroke-width={100 / planet.size}
          x={x}
          y={y}
        />
      </g>
    );
  }

  get x() {
    return this.constructor.corner.includes('left')
      ? ((this.canvasWidth / 2) * -1) + this.edgeOffset
      : (this.canvasWidth / 2) - this.size - this.edgeOffset;
  }

  get y() {
    return this.constructor.corner.includes('upper')
      ? ((this.canvasHeight / 2) * -1) + this.edgeOffset
      : (this.canvasHeight / 2) - this.size - this.edgeOffset;
  }

  get Element() {
    const x = this.x;
    const y = this.y;
    return (props) => <g {...props}>
      <radialGradient id={`${this.name}Gradient`}>
        <stop offset="0%" stop-color={this.constructor.color} />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
      <circle cx={x + (this.size / 2)} cy={y + this.size / 2} r={this.size * 17} fill={`url('#${this.name}Gradient')`} opacity=".2" />
      <use
        href={`#${this.name}-symbol`}
        x={x}
        y={y}
        width={this.size}
        height={this.size}
        stroke-width={100 / this.size}
        color={this.constructor.color}
      />
    </g>
  }
}

export default AlchemicalElement;
