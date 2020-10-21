import { Component } from 'preact';

import { Glow, Turbulence } from './filters';

export const Pulse = ({ color, ...props }) => (
  <animate
    attributeName="fill"
    values={`transparent;${color};transparent`}
    dur="3s"
    repeatCount="indefinite"
  />
);

export const Rulership = (props) => (
  <Glow
    name="rulership"
    color="#FFFB00"
  />
);

export const Exaltation = (props) => (
  <Glow
    name="exaltation"
    color="9A00FF"
  />
);

export const Detriment = (props) => (
  <Turbulence
    name="detriment"
    intensity="3"
  />
);

export const Fall = (props) => (
  <Turbulence
    name="fall"
    intensity="5"
  />
);

const dignifications = [ Rulership, Exaltation, Detriment, Fall ];

export default dignifications;
