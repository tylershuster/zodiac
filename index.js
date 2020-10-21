
// https://trello.com/c/kfdKH7iX/60-zodiac-chart
import './style';
import { Component } from 'preact';
import PHI from 'const-phi';
import DateTime from 'react-datetime';
import ephemeris from 'ephemeris';
import SunCalc from 'suncalc';
import romanize from 'romanize';
import { acot } from 'mathjs';
import { Paths } from 'react-svg-textures/lib';
import 'react-datetime/css/react-datetime.css';
import 'leaflet/dist/leaflet.css';
import Moment from './assets/moment';

import Planets from './components/planets';

import Zodiac from './components/zodiac';

import Elements from './components/elements';

import SettingsPage from './components/SettingsPage';
import Atmosphere from './components/Atmosphere';
import Aspect from './components/Aspect';
import { Glow, Sketch } from './components/filters';
import dignifications from './components/dignifications';
import calcCoeli from './components/coeli';
import Map from './components/Map';

import { deg2rad, rad2deg, coordsFromDegree, getGMST, rangeDegree, arccot, filterAngle, getQueryVariable } from './assets/utilities';


export class Gaia extends Component {

  render ({ radius, ...props }) {
    return (
      <g id="Gaia" {...props}>
        <circle cx="0" cy="0" r={radius} />
        <line id="Prime Meridian" x1="0" x2="0" y1={0 - radius} y2={radius} />
        <line id="Horizon" x1={0 - radius} x2={radius} y1="0" y2="0" />
      </g>
    );
  }
}


const colorSchemes = {
  Moon: { foregroundColor: 'black', backgroundColor: 'white'},
  Mercury: { foregroundColor: 'black', backgroundColor: 'white'},
  Venus: { foregroundColor: '#F2EDCB', backgroundColor: '#355F70'},
  Sun: { foregroundColor: '#401607', backgroundColor: '#F2A516' },
  Mars: { foregroundColor: '#F25C05', backgroundColor: '#40130F'},
  Jupiter: { foregroundColor: '#EE8D0A', backgroundColor: '#2C0A40'},
  Saturn: { foregroundColor: '#D9AD77', backgroundColor: '#0D0D0D'}
};


function range(start, end, step = 1) {
  const len = Math.floor((end - start) / step) + 1
  return Array(len).fill().map((_, idx) => start + (idx * step))
}


export class Chart extends Component {

  constructor(props) {
    super(props);
  }

  get planetsEnabled() {
    return Planets;
  }

  get gaiaRadius () {
    return (this.size / 2 - ((this.planetsEnabled.length + 1) / PHI)) / (12 + (1 / PHI));
  }

  get planetSize () {
    return this.gaiaRadius / PHI;
  }

  get fontSize () {
    return this.gaiaRadius / PHI / PHI;
  }

  get zodiacBoundary () {
    return this.gaiaRadius + this.planetSize + (this.planetsEnabled.length * this.planetSize) + this.gaiaRadius * 2;
  }

  get orbitDistance () {
    return this.zodiacBoundary - this.gaiaRadius - (this.planetSize * 2);
  }

  setup(props) {
    const { here, now, size, settings, luminescence } = props;
    this.settings = settings;
    this.here = here;
    this.now = now;
    this.size = size;
    this.color = (luminescence === 'dark') ? 'white' : 'black';
    const { height, width } = this.svgProps();
    this.planets = this.planetsEnabled.map(
      Planet => new Planet(here, now)
        .setDistanceOffset(settings.gaiaRadius + settings.planetSize)
        .setCanvas(width, height)
        .setSize(this.planetSize)
        .setColor(this.color)
        .setOrbitStyle(this.settings.orbitStyle, this.orbitDistance)
    );
    this.transitReference = this.planetsEnabled.map(
      Planet => new Planet(here, new Moment('1990-07-21 05:22'))
        .setDistanceOffset(settings.gaiaRadius + settings.planetSize)
        .setCanvas(width, height)
        .setSize(this.planetSize)
        .setColor(this.color)
        .setOrbitStyle(this.settings.orbitStyle, this.orbitDistance)
    );
    this.zodiac = Zodiac.map(
      Sign => new Sign()
        .setCanvas(width, height)
        .setBoundary(this.zodiacBoundary)
        .setSize(this.gaiaRadius)
        .setColor(this.settings.zodiac.color ? Sign.element.color : this.color));
    this.elements = Elements.map(
      Element => new Element()
        .setCanvas(width, height)
        .setSize(this.gaiaRadius * PHI)
        .setEdgeOffset(this.gaiaRadius));
    this.coeli = calcCoeli({ here, now, tickDistance: this.zodiacBoundary, tickLength: this.planetSize, fontSize: this.fontSize });
    this.style = props.style || {};
  }

  svgProps() {
    const height = this.size;
    const width = height * PHI;
    const viewBox = `${width * -.5} ${height * -.5} ${width} ${height}`;
    const version = 2;
    const xmlns = 'https://www.w3.org/2000/svg';
    return { height, width, viewBox, version, xmlns };
  }

  aspects(degree, maxOrb = 8) {
    const sets = [];
    this.planets.forEach(planet1 => {
      this.planets.forEach(planet2 => {
        const orb = Math.abs( degree - (180 - Math.abs(Math.abs(planet1.degree - planet2.degree) - 180)));
        if(planet2.name !== planet1.name && (orb <= maxOrb)) {
          // Prevent duplicates:
          if(sets.map(set => `${set.planet1.name}-${set.planet2.name}`).includes(`${planet2.name}-${planet1.name}`)) return;
          sets.push({ planet1, planet2, orb });
        }
      })
    })
    return sets;
  }

  solarSystemMask() {
    const solarSystemRadius = this.settings.orbitStyle === 'spheres'
      ? this.gaiaRadius + this.planetSize + (this.planetSize * this.planets.length) + (this.planetSize / 2)
      : this.orbitDistance - (this.planetSize / 2);
    return (
      <mask id="Solar System">
        <use href="#void" fill="white" />
        <circle
          cx="0"
          cy="0"
          r={solarSystemRadius}
          fill="black"
          opacity=".75"
          />
      </mask>
    );
  }

  render({ chooseDate, chooseLocation, showSettings, ...props }) {
    this.setup(props);

    const planetaryHourOrder = this.planets
      .filter(planet => planet.hourOrder !== undefined)
      .sort((one, two) => one.hourOrder - two.hourOrder)
      .map(planet => planet.name);

    // Calculate the planetary hour
    // https://en.wikipedia.org/wiki/Planetary_hours
    const hour = this.now.hour() % 7 - 1;
    const dayOfWeek = this.now.format('dddd');
    const ordered = planetaryHourOrder.slice(planetaryHourOrder.indexOf(dayOfWeek)).concat(planetaryHourOrder.slice(0, planetaryHourOrder.indexOf(dayOfWeek)));
    const hourOf = ordered[hour === -1 ? 6 : hour];

    let svgProps;
    const { height, width } = svgProps = this.svgProps();
    
    return (
      <svg {...svgProps} color={this.color} style={this.style}>
        <defs>
          {this.planets.map(({ Symbol, degree }) => <Symbol degree={degree + 90} />)}
          {this.zodiac.map(({ Symbol }) => <Symbol />)}
          {this.elements.map(({ Symbol }) => <Symbol />)}
          {this.elements.map((element) => <Glow name={`${element.name}-glow`} color={element.constructor.color} />)}
          <Atmosphere color={this.color} />
          <rect id="void" x={width * -1} y={height * -1} width={width * 3} height={height * 3} />
          {this.solarSystemMask()}
          <mask id="GaiaMask">
            <use href="#void" fill="white" />
            <circle
              cx="0"
              cy="0"
              r={this.gaiaRadius}
              fill="black"
              />
          </mask>
          {dignifications.map(Symbol => <Symbol />)}
          <Sketch />
          <Paths
            id="firmament"
            d="waves"
            size="10"
            stroke={this.color}
            background="transparent"
            strokeWidth="1"
          />
        </defs>
        <circle
          fill="url(#firmament)"
          cx="0"
          cy="0"
          r={this.gaiaRadius + this.planetSize + (this.planetSize / 2)}
          stroke={this.color}
          mask="url(#GaiaMask)"
        />
        <g id="Heavens" transform={`rotate(${ 180 - this.coeli.ac.degree} 0 0)`}>
          <g id="Bodies">
            {this.planets.map(({ Element, name }) => <Element id={name} />)}
            {this.transitReference.map(({ Element, name }) => <Element opacity=".5" id={`next-${name}`} />)}
            {this.zodiac.map(({ Element }) => <Element />)}
          </g>
          <g id="Calculations">
            <circle
              fill="url(#Atmosphere)"
              class="orbit"
              cx="0"
              cy="0"
              r={this.gaiaRadius + this.planetSize + (this.planetSize * this.planets.length) + (this.planetSize / 2)}
            />
            {this.planets.map(({ Orbit, Trail }) => {
              return (
                <g>
                  {this.settings.spheres.visible ?
                    <Orbit />
                  : null}
                  {this.settings.trails.visible ?
                    <Trail length={this.settings.trails.length} />
                  : null}
                </g>
              );
            })}
            <g mask="url('#Solar\ System')">
              <circle class="orbit" cx="0" cy="0" r={this.zodiacBoundary} />
              <g mask="url(#GaiaMask)">
                {this.zodiac.map(({ Line }) => <Line color={this.color} />)}
              </g>
            </g>
            {this.settings.trines.visible ?
              <g id="trines">
                {this.aspects(120, this.settings.trines.orb).map(props => <Aspect maxOrb={this.settings.trines.orb} name="trine" {...props} />)}
              </g>
            : null}
            {this.settings.oppositions.visible ?
              <g id="oppositions">
                {this.aspects(180, this.settings.oppositions.orb).map(props => <Aspect name="opposition" maxOrb={this.settings.oppositions.orb} {...props} />)}
              </g>
            : null}
            {this.settings.squares.visible ?
              <g id="squares">
                {this.aspects(90, this.settings.squares.orb).map(props => <Aspect name="square" maxOrb={this.settings.squares.orb} {...props} />)}
              </g>
            : null}
            {this.settings.sextiles.visible ?
              <g id="sextiles">
                {this.aspects(60, this.settings.sextiles.orb).map(props => <Aspect name="sextile" maxOrb={this.settings.sextiles.orb} {...props} />)}
              </g>
            : null}
            {this.settings.coeli.visible ?
              <g id="Coeli">
                {Object.keys(this.coeli).map((name) => {
                  const { Line, Label } = this.coeli[name];
                  return (
                    <g id={name}>
                      <Line stroke={this.color} />
                      <Label fill={this.color} style={{ fontSize: this.fontSize }} />
                    </g>
                  );
                })}
              </g>
            : null}
            {this.settings.houses.visible ?
              <g id="houses" mask="url('#Solar\ System')">
                {range(30, 360, 30).map(degree => {
                  const text = romanize(degree / 30);
                  degree = (degree - this.coeli.ac.degree) * -1;
                  const { x: x1, y: y1 } = coordsFromDegree({ degree, distance: this.zodiacBoundary });
                  const { x: x2, y: y2 } = coordsFromDegree({ degree, distance: this.zodiacBoundary + this.planetSize });
                  const { x: numX, y: numY } = coordsFromDegree({ degree: degree + 15, distance: this.zodiacBoundary + this.planetSize });
                  return <g>
                    <text
                      x={numX}
                      y={numY}
                      fill="white"
                      transform={`rotate(${this.coeli.ac.degree + 180} ${numX} ${numY})`}
                      text-anchor="middle"
                      dominant-baseline="central"
                      font-size={this.fontSize}
                    >{text}</text>
                    <line stroke="white" x1={x1} y1={y1} x2={x2} y2={y2}  />
                  </g>;

                })}
              </g>
            : null}
            
            
          </g>

        </g>
        <g id="Elements">
          {this.elements.map(({ Element, name, corner, hasPlanet }) => {
            const signs = this.zodiac.filter((sign) => sign.constructor.element.name === name);
            const planets = this.planets.filter(({ degree, name }) => {
              return signs.filter(sign => {
                return degree >= sign.degree - 15 && degree <= sign.degree + 15;
              }).length;
            });
            return (
              <g id={name}>
                <Element onClick={showSettings} />
                {planets.map((planet, index) => hasPlanet(planet, this.zodiac, index))}
              </g>
            );
          })}
        </g>

        <Gaia radius={this.gaiaRadius} onClick={chooseLocation} />
        <text
          onClick={chooseDate}
          style={{ fontSize: this.fontSize }}
          text-anchor="middle"
          dominant-baseline="central"
          x="0"
          y={(height / 2 * -1) + this.gaiaRadius}
          fill={this.color}>
          {this.now.format(`[The day of] dddd [and hour of ${['Sun', 'Moon'].includes(hourOf) ? `the ${hourOf}` : hourOf}]`)}</text>
        <text
          onClick={chooseDate}
          style={{ fontSize: this.fontSize }}
          text-anchor="start"
          dominant-baseline="central"
          x={((width / 2) - this.gaiaRadius) * -1}
          y="0"
          fill={this.color}
          >
          {this.now.format('[the] Do [of] MMMM')}</text>
        <text
          onClick={chooseDate}
          style={{ fontSize: this.fontSize }}
          text-anchor="end"
          dominant-baseline="central"
          x={((width / 2) - this.gaiaRadius)}
          y="0"
          fill={this.color}
          >
          {this.now.format('h [hours &] m [minutes] A')}</text>
        <text
          onClick={chooseDate}
          style={{ fontSize: this.fontSize }}
          text-anchor="middle"
          dominant-baseline="central"
          x="0"
          y={(height / 2) - this.gaiaRadius}
          fill={this.color}
          >
          {this.now.format('[the year of our Lord] YYYY')}</text>
      </svg>
    );

  }
}

class App extends Component {
  constructor(props) {
    super(props);
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    this.state = {
      size: window.innerHeight,
      choosingDate: false,
      choosingLocation: false,
      luminescence: 'dark',
      settingsVisible: false,
      settings: savedSettings ? savedSettings : {
        orbitStyle: 'spheres',
        trines: {
          visible: true,
          orb: 8,
        },
        sextiles: {
          visible: true,
          orb: 10,
        },
        squares: {
          visible: true,
          orb: 3,
        },
        oppositions: {
          visible: true,
          orb: 10,
        },
        trails: {
          visible: true,
          length: 20,
        },
        houses: {
          visible: true
        },
        coeli: {
          visible: true
        },
        spheres: {
          visible: true
        },
        zodiac: {
          color: true
        }
      },
      here: { lat: 40.574638, lng: -122.381088 },
      now: new Moment(),
    };
    if(getQueryVariable('here')) {
      const parts = getQueryVariable('here').split(',');
      this.state.here = {
        lat: Number(parts[0]),
        lng: Number(parts[1]),
      };
    }
    if(getQueryVariable('now')) {
      this.state.now = Moment.unix(getQueryVariable('now'));
    }
    // this.state.settings = Object.assign(this.state.settings, Chart.defaults);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
        this.setState({ size: window.innerHeight });
    }, true);
    document.addEventListener('keyup', (event) => {
      if(event.key === 'ArrowRight') {
        this.setState({ now: this.state.now.clone().add(1, 'hours') });
      } else if(event.key === 'ArrowLeft') {
        this.setState({ now: this.state.now.clone().subtract(1, 'hours') });
      } else if(event.key === 's') {
        this.setState({ now: new Moment('2019-06-13 03:04') });
      } else if(event.key === 't') {
        this.setState({ now: new Moment('1990-07-21 05:22') });
      } else if(event.key === 'e') {
        this.setState({ now: new Moment('1989-01-17 09:30') });
      } else if(event.key === 'r') {
        this.setState({ now: new Moment('1992-06-14 20:55') });
      } else if(event.key === 'n') {
        this.setState({ now: new Moment() });
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    window.history.pushState({}, '', `?here=${nextState.here.lat},${nextState.here.lng}&now=${nextState.now.unix()}`);
  }

  handleSettingsChange(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
    this.setState({ settings });
  }

  render() {
    const { here, now, settings, size, choosingDate, choosingLocation, luminescence, settingsVisible } = this.state;
    const backgroundColor = luminescence === 'dark' ? 'black' : 'white';
    return (
      <main style={{ backgroundColor }}>
        {choosingDate ?
          <div>
            <span className="closeButton" onClick={event => this.setState({ choosingDate: false })} />
            <DateTime
                closeOnSelect={true}
                open={choosingDate}
                onChange={now => this.setState({ now })}
                className="datePicker"
                value={now}
                dateFormat='[The day of] dddd, [the] Do [of] MMMM [in the year of our Lord] YYYY'
                timeFormat='[at] h [hours and] mm [minutes] A'
                renderInput={(props, openCalendar, closeCalendar) => {
                  return null;
                }}
              />
          </div>
        : null}
        <Chart
          here={here}
          now={now}
          size={size}
          settings={settings}
          luminescence={luminescence}
          toggleLuminescence={event => this.setState({ luminescence: luminescence === 'dark' ? 'light' : 'dark'})}
          showSettings={event => this.setState({ settingsVisible: true })}
          chooseDate={event => this.setState({ choosingDate: true })}
          chooseLocation={event => this.setState({ choosingLocation: true })}
          style={(settingsVisible || choosingDate) ? { filter: "blur(2px)"  } : {}}
        />
        <SettingsPage visible={settingsVisible} settings={settings} onChange={this.handleSettingsChange} close={event => this.setState({ settingsVisible: false })} />
        {choosingLocation
          ? <div>
              <span className="closeButton" onClick={event => this.setState({ choosingLocation: false })} />
              <Map lat={here.lat} lng={here.lng} onClick={event => this.setState({ here: event.latlng })} />
            </div>
        : null}
      </main>
    );
  }
}

export default App;
