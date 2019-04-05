import React, { Component } from "react";
import { control, Map, tileLayer } from "leaflet";
import "./App.css";
import 'leaflet/dist/leaflet.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mapClicked = this.mapClicked.bind(this);
  }
  mapClicked({ latlng: loc }) {
    this.map.panTo(loc);
    fetch(`https://data.linz.govt.nz/services/query/v1/vector.json?key=2269dc5590604b2c8cedec1fe70a04cb&layer=50295&x=${loc.lng}&y=${loc.lat}&max_results=1&radius=10000`)
      .then(r => r.json())
      .then(data => this.setState({ topo50: data.vectorQuery.layers[50295].features[0] && data.vectorQuery.layers[50295].features[0].properties }));
    fetch(`https://data.linz.govt.nz/services/query/v1/vector.json?key=2269dc5590604b2c8cedec1fe70a04cb&layer=50169&x=${loc.lng}&y=${loc.lat}&max_results=1&radius=10000`)
      .then(r => r.json())
      .then(data => this.setState({ topo250: data.vectorQuery.layers[50169].features[0] && data.vectorQuery.layers[50169].features[0].properties }));
  }
  buildUrl(namespace, format, feature) {
    const versionMatches = /^Edition ([\d.]+) .+/.exec(feature.edition);
    const fileNamespace = namespace === "Topo250" ? "250-" : "";
    let formatRef = format === "GeoTIFF" ? "GeoTif" : "TIFF";
    if (namespace === "Topo250" && format === "GeoTIFF") formatRef += "f"; // Topo250 adjustment
    const version = `v${versionMatches[1]}`.replace(".", "-");
    const filename = `${fileNamespace}${feature.sheet_code}_${formatRef}${version}.tif`
    return `http://topo.linz.govt.nz/${namespace}_raster_images/${format}${namespace}/${filename}`
  }
  componentDidMount() {
    document.querySelector("#about").showModal();
    const topoTiles = tileLayer(
      'http://tiles-a.data-cdn.linz.govt.nz/services;key=2269dc5590604b2c8cedec1fe70a04cb/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png',
      {
        attribution: "CC BY 4.0 Land Information New Zealand",
        maxZoom: 16,
        minZoom: 6
      });
    this.map = new Map(this.mapRef, {
      center: [-42, 172],
      zoom: 6,
      zoomControl: false,
      maxBounds: [[-46.641235447, 160], [-34.4506617165, 178.517093541]],
      layers: [topoTiles]
    });
    this.map.addControl(control.zoom({ position: 'bottomright' }));
    this.map.on("click", this.mapClicked);
  }
  render() {
    const { topo50, topo250 } = this.state;
    let topo50Data = null;
    let topo250Data = null;
    let sidebar = null;
    const about = <React.Fragment>
      <p>
        This is a simple tool to find the appropriate Topo50 and
        Topo250 map for the area of New Zealand you are interested in.
      </p>

      <p>
        Click anywhere in the country to see links to the maps that cover
      that area.
      </p>

      <p>
        Created by <a href="https://joshmcarthur.com">Josh McArthur</a>,
        in Wellington, New Zealand. This application uses open data available from
        the LINZ data service: <a href="https://data.linz.govt.nz">https://data.linz.govt.nz</a>.
      </p>
    </React.Fragment>

    if (topo50) {
      topo50Data = (
        <React.Fragment>
          <h1>Topo50 {topo50.sheet_code}<small>{topo50.sheet_name}</small></h1>
          <dl className="formatList">
            <dt>GeoTIFF</dt>
            <dd><a href={this.buildUrl("Topo50", "GeoTIFF", topo50)}>Download in GeoTIFF format</a></dd>
            {/* Georeferenced map image, including metadata such as coordinate system and bounds.
              This format does not include a map legend. The legend is separately available.<br></br>
              This format is suitable for composition of new map extents or partial presentation
              (digital presentations, visualisations, etc).<br />
              Geo data can also be downloaded from the <a href="https://data.linz.govt.nz">LINZ Data Service</a> which
              offers better map viewing and custom cropping than
              transforming the GeoTIFF image directly. */}
            <dt>TIFF</dt>
            <dd><a href={this.buildUrl("Topo50", "TIFF", topo50)}>Download in TIFF format</a></dd>
            {/* <dd>
              Full map including the legend. Map does not contain geo metadata
              such as the bounds and coordinate system.<br></br>
              This format can be used for printing and standalone presentation.
            </dd> */}

            <dt>Map Legend</dt>
            <dd>
              <a href="https://www.linz.govt.nz/topography/topo-maps/topo50/digital-images/topo50-important-info/topo50-legend.tif">Download TIFF</a>
              <br />
              Map legend common to all Topo50 maps.
            </dd>
          </dl>
        </React.Fragment>
      );
    }

    if (topo250) {
      topo250Data = (
        <React.Fragment>
          <h1>Topo250 {topo250.sheet_code}<small>{topo250.sheet_name}</small></h1>
          <dl className="formatList">
            <dt>GeoTIFF</dt>
            <dd><a href={this.buildUrl("Topo250", "GeoTIFF", topo250)}>Download in GeoTIFF format</a></dd>
            <dt>TIFF</dt>
            <dd><a href={this.buildUrl("Topo250", "TIFF", topo250)}>Download in GeoTIFF format</a></dd>
            <dt>Map Legend</dt>
            <dd>
              <a href="https://www.linz.govt.nz/topography/topo-maps/topo250/digital-images/topo250-important-info/topo250-legend.tif">Download TIFF</a>
              <br />
              Map legend common to all Topo50 maps.
            </dd>
          </dl>
        </React.Fragment>
      );
    }

    if (topo50Data || topo250Data) {
      sidebar = (
        <div className="mapData">
          <span onClick={() => this.setState({ topo50: null, topo250: null })} className="close">&times;</span>
          {topo50Data}
          {topo250Data}
          <footer>{about}</footer>
        </div>
      );
    };

    return (
      <React.Fragment>
        {sidebar}
        <dialog id="about">
          <span onClick={() => document.querySelector("#about").close()} className="close">&times;</span>
          {about}
        </dialog>
        <div id="map" ref={el => this.mapRef = el}></div>
      </React.Fragment>
    )
  }
}

export default App;