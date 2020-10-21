import { Component } from 'preact';
import L from 'leaflet';

class Map extends Component {
  constructor(props) {
    super(props);
    this.lat = props.lat;
    this.lng = props.lng;
    this.onClick = props.onClick;
  }
  
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 2,
      layers: [
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: ''
        }),
      ]
    });

    this.marker = this.addMarker(this.lat, this.lng);

    this.map.on('click', event => {
      this.map.removeLayer(this.marker);
      this.marker = this.addMarker(event.latlng.lat, event.latlng.lng);
      this.onClick(event);
    });
  }

  addMarker(lat, lng) {
    return L.marker({ lat, lng }, {
      icon: L.icon({
        iconUrl: './assets/icon.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      })
    }).addTo(this.map);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div id="map"></div>
  }
}

export default Map;