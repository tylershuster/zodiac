import { Component } from 'preact';

import { hex2Rgb } from '../assets/utilities';

export const Glow = ({ name, color, ...props }) => (
  <filter id={name}>
    <feColorMatrix type="matrix" values={
      `0 0 0 0 ${hex2Rgb(color).r}
       0 0 0 0 ${hex2Rgb(color).g}
       0 0 0 0 ${hex2Rgb(color).b}
       0 0 0 1 0`
    } />
    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
);

export const Turbulence = ({ name, intensity, ...props}) => (
  <filter id={name}>
    <feTurbulence
      baseFrequency="3"
      type="turbulence"
      numOctaves="2"
      result="turbulence"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="turbulence"
      scale={intensity}
      xChannelSelector="R"
      yChannelSelector="G"
      result="displacementMap"
    />
  </filter>
);

export const Sketch = () => (
  <filter id="sketched">
    <feTurbulence
      baseFrequency="1"
      type="turbulence"
      numOctaves="2"
      result="turbulence"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="turbulence"
      scale="1.1"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
);
