export const deg2rad = (degree) => degree * Math.PI / 180;

export const rad2deg = (rad) => rad * (180 / Math.PI);

// Width and height are of canvas
export const coordsFromDegree = function ({ degree, distance }) {
  const x = Math.cos(deg2rad(degree)) * distance;
  const y = Math.sin(deg2rad(degree)) * distance;
  return { x, y };
}

export const arcLength = (r, a) => Math.PI * 2 * r * (a / 360);

export const arcDegrees = (length, r) => 360 * (length / (Math.PI * 2 * r));

export const arccot = (x) => (Math.PI / 2) - Math.atan(x);

export const Tick = ({ degree, ...props }) => {
  const originalDegree = degree;
  degree = filterAngle(degree);
  const { x: x1, y: y1 } = coordsFromDegree({ degree, distance: defaults.zodiacBoundary });
  const { x: x2, y: y2 } = coordsFromDegree({ degree, distance: defaults.zodiacBoundary + 5});
  const { x: tx, y: ty } = coordsFromDegree({ degree, distance: defaults.zodiacBoundary + 15});

  return (
    <g>
      <line x1={x1} x2={x2} y1={y1} y2={y2} stroke="white" />
       <text
        text-anchor="middle"
        x={tx}
        y={ty}
        fill="white"
        dominant-baseline="central"
        transform={`rotate(${degree + 180} ${tx} ${ty})`}
      >{originalDegree}</text>
    </g>
  );
}

// https://github.com/tingletech/moon-phase
export const dFromPhase = (moonPhase) => {
  let mag, sweep, d = "m50,0";
  if (moonPhase <= 0.25) {
    sweep = [ 1, 0 ];
    mag = 20 - 20 * moonPhase * 4;
  } else if (moonPhase <= 0.50) {
    sweep = [ 0, 0 ];
    mag = 20 * (moonPhase - 0.25) * 4;
  } else if (moonPhase <= 0.75) {
    sweep = [ 1, 1 ];
    mag = 20 - 20 * (moonPhase - 0.50) * 4;
  } else if (moonPhase <= 1) {
    sweep = [ 0, 1 ];
    mag = 20 * (moonPhase - 0.75) * 4;
  }

  d = d + "a" + mag + ",20 0 1," + sweep[0] + " 0,100 ";
  d = d + "a20,20 0 1," + sweep[1] + " 0,-100";
  return d;
}

export const rangeDegree = (degree, limit = 360) => {
  // circle goes round and round, adjust if < 0 or > 360 degrees
  if( degree > 0.0 ) {
    while( degree > limit ) {
      degree -= limit;
    }
  } else {
    while( degree < 0.0 ) {
      degree += limit;
    }
  }
  return degree;
}

// http://www.indigotide.com/software/siderealsource.html
// Function getGMST computes Mean Sidereal Time (J2000)
// Input: Current Date
// Returns: Adjusted Greenwich Mean Sidereal Time (GMST) in degrees

export const getGMST = (now) => {
  var year = now.getUTCFullYear(); // get UTC from computer clock date & time (var now)
  var month = now.getUTCMonth() + 1;
  var day = now.getUTCDate();
  var hour = now.getUTCHours();
  var minute = now.getUTCMinutes();
  var second = now.getUTCSeconds();

  if( month == 1 || month == 2 ) {
    year = year - 1;
    month = month + 12;
  }

  var lc = Math.floor( year / 100 ); //integer # days / leap century
  var ly = 2 - lc + Math.floor( lc / 4 ); //integer # days / leap year
  var y = Math.floor(365.25 * year); //integer # days / year
  var m = Math.floor(30.6001 * (month + 1)); //integer # days / month

  // now get julian days since J2000.0
  var jd = ly + y + m - 730550.5 + day + (hour + minute / 60 + second / 3600) / 24.0;

  // julian centuries since J2000.0
  var jc = jd / 36525.0;

  // Greenwich Mean Sidereal Time (GMST) in degrees
  var GMST = rangeDegree(280.46061837 + 360.98564736629 * jd + 0.000387933 * jc * jc - jc * jc * jc / 38710000);
  return GMST; // in degrees
}

export const lstHours = (now, long) => {

  var beg = new Date( now.getUTCFullYear() - 1, 11, 31 ); // get last day of previous year in milliseconds
  var day = Math.floor( ( now - beg ) / 86400000 ); // compute integer day of year (86400000 ms/day)

  var mst = getGMST( now ); // get adjusted GMST in degrees for current system time
  var mstAngle = mst; // save for GMST Angle display

  // compute integer GMST hour angle deg min sec
  var gmstdeg = Math.floor( mstAngle ); // get integer GMST hour angle degrees right ascension of vernal equinox

  mstAngle = mstAngle - gmstdeg; // get integer GMST hour angle minutes right ascension of vernal equinox
  mstAngle = mstAngle * 60;
  var gmstmin = Math.floor( mstAngle );

  mstAngle = mstAngle - gmstmin; // get integer GMST hour angle seconds right ascension of vernal equinox
  mstAngle = mstAngle * 60;
  var gmstsec = Math.floor( mstAngle );

  var lst = rangeDegree(mst + long); // now we know GMST so just add local longitude offset

  lst = lst / 15.0; // change LST from degrees to time units (15 deg/hour)

  return lst;
}

export const hex2Rgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// // Calculate the Mean Longitude of the Sun
// _getSunsMeanLongitude : function(T){
//     var L = 280.46645 + 36000.76983*T + 0.0003032*T*T;
//     L = L % 360;
//     if (L<0) {
//         L = L + 360;
//     }
//     return L;
// }

// // T = Time Factor Time factor in Julian centuries reckoned from J2000.0, corresponding to JD
// // Calculate Earths Obliquity Nutation
// export const obliquity = (T) => {
//     var K = Math.PI/180.0;
//     var LS = this._getSunsMeanLongitude(T);
//     var LM = 218.3165 + 481267.8813*T;
//     var eps0 =  23.0 + 26.0/60.0 + 21.448/3600.0 - (46.8150*T + 0.00059*T*T - 0.001813*T*T*T)/3600;
//     var omega = 125.04452 - 1934.136261*T + 0.0020708*T*T + T*T*T/450000;
//     var deltaEps = (9.20*Math.cos(K*omega) + 0.57*Math.cos(K*2*LS) + 0.10*Math.cos(K*2*LM) - 0.09*Math.cos(K*2*omega))/3600;
//     return eps0 + deltaEps;
// }

export const filterAngle = (angle) => rangeDegree(angle * -1);

export const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}