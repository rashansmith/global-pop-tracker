import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const populationRanges = [
    { threshold: 100000000, color: '#800026', label: '> 100,000,000' },
    { threshold: 50000000, color: '#BD0026', label: '50,000,000 - 100,000,000' },
    { threshold: 20000000, color: '#E31A1C', label: '20,000,000 - 50,000,000' },
    { threshold: 10000000, color: '#FC4E2A', label: '10,000,000 - 20,000,000' },
    { threshold: 5000000, color: '#FD8D3C', label: '5,000,000 - 10,000,000' },
    { threshold: 2000000, color: '#FEB24C', label: '2,000,000 - 5,000,000' },
    { threshold: 0, color: '#FFEDA0', label: '< 2,000,000' }
];

const LegendComponent = () => (
    <div className="legend">
      <h4 >Population Ranges (as of Dec. 2023)</h4>
      {populationRanges.map((range, index) => (
        <div key={index}>
          <span style={{ background: range.color, width: '30px', float: 'left', height: '18px', display: 'inline-block', marginRight: '8px', opacity: '0.7' }}></span>
          {range.label}
        </div>
      ))}
      <span style={{float: 'left'}}>DataSource: <a href="https://d6wn6bmjj722w.population.io/#!/population/retrievePopulationTableAllAges">World Population API</a></span>
    </div>
  );

  export default LegendComponent;


