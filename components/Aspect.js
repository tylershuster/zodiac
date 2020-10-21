import { Component } from 'preact';

const colors = {
  trine: 120,
  sextile: 180,
  square: 0,
  opposition: 330,
};

// 0: red
// 30: orange
// 60: yellow
// 90: green
// 120: darker green
// 150: aquamarine
// 180: blue
// 210: violet
// 240: dark blue
// 270: purple
// 300: pink
// 330: magenta

const Aspect = ({ name, planet1, planet2, orb, maxOrb = 8 }) => {
  const { x: x1, y: y1 } = planet1.coordsFromDegree();
  const { x: x2, y: y2 } = planet2.coordsFromDegree();
  const id = `${planet1.name}-${planet2.name}-${name}`;
  const color = `hsla(${colors[name]}, 100%, ${50}%)`;

  return (
    <g>
      <line
        id={id}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
      />
      <text fill={`hsla(${colors[name]}, 100%, 50%)`} text-anchor="middle" dy="-1">
        <textPath href={`#${id}`} startOffset="50%">{orb.toFixed(1)}&deg;</textPath>
      </text>
    </g>
  );
};

export default Aspect;
