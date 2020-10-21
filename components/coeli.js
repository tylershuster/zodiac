import { Component } from 'preact';

import { deg2rad, rad2deg, coordsFromDegree, getGMST, filterAngle, arccot } from '../assets/utilities';

export default function calcCoeli ({ here, now, tickDistance, tickLength = 20, fontSize = 10 }) {
  // 0 is the Aries point
    const obliquity = 23.4392911; // TODO http://dzucconi.github.io/calendrical/docs/calendrical.astro.html
    // These two are in radians because they are only used for calculation
    // by the JavaScript Math functions which take and return radians
    const e = deg2rad(obliquity);
    const ramc = deg2rad(getGMST(now.toDate()) + here.lng);
    // These four are in degrees because they need to be plotted thusly

    // Adjusts for the fact that the mc, for example, can only be
    // in the top half of the chart. Adds 180 degrees
    const adjustment = (180 * (Math.cos(ramc) < 0 ? 1 : 0))

    const ac = rad2deg(arccot(0 - ( (Math.tan(deg2rad(here.lat)) * Math.sin(e)) + (Math.sin(ramc) * Math.cos(e)) ) / Math.cos(ramc))) + adjustment;
    const mc = rad2deg(Math.atan(Math.tan(ramc) / Math.cos(e))) + adjustment;
    const dc = ac + 180;
    const ic = mc + 180;
    const coeli = { ac, mc, dc, ic };
    Object.keys(coeli).map((name, index) => {
      coeli[name] = ((degree) => {
        degree = filterAngle(degree);
        const { x: x1, y: y1 } = coordsFromDegree({ degree, distance: tickDistance });
        const { x: x2, y: y2 } = coordsFromDegree({ degree, distance: tickDistance + tickLength});
        const { x: tx, y: ty } = coordsFromDegree({ degree, distance: tickDistance + tickLength + fontSize});
        return {
          Line: (props) => (<line x1={x1} x2={x2} y1={y1} y2={y2} {...props} />),
          Label: (props) => (
            <text
              text-anchor="middle"
              x={tx}
              y={ty}
              dominant-baseline="central"
              transform={`rotate(${degree + 180 - (index * 90)} ${tx} ${ty})`}
              {...props}
            >{name.substr(0, 1)}<tspan style={{ fontSize: '.618em' }} dy={-2.5}>c</tspan></text>
          ),
          degree,
        };
      })(coeli[name]);
    });
    return coeli;
}