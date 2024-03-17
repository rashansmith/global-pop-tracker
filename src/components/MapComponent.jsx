import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import originalGeoJsonData from "../../resources/countries.json"


const MapComponent = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const mapRef = useRef(null);
  const [selectedThreshold, setSelectedThreshold] = useState(null);

  const populationRanges = [
    { threshold: 100000000, color: '#800026', label: '> 100,000,000' },
    { threshold: 50000000, color: '#BD0026', label: '50,000,000 - 100,000,000' },
    { threshold: 20000000, color: '#E31A1C', label: '20,000,000 - 50,000,000' },
    { threshold: 10000000, color: '#FC4E2A', label: '10,000,000 - 20,000,000' },
    { threshold: 5000000, color: '#FD8D3C', label: '5,000,000 - 10,000,000' },
    { threshold: 2000000, color: '#FEB24C', label: '2,000,000 - 5,000,000' },
    { threshold: 0, color: '#FFEDA0', label: '< 2,000,000' }
  ];  


  const handleThresholdChange = (event) => {
    const threshold = populationRanges.find(range => range.label === event.target.value);
    console.log("Threshold change", threshold, event.target.value );
    setSelectedThreshold(threshold);
  };

  const updateMapData = async (selectedThreshold) => {
    const enrichedData = await enrichGeoJsonData(originalGeoJsonData); 
    const filteredData = filterGeoJsonDataByThreshold(enrichedData, selectedThreshold);
    setGeojsonData(filteredData);
  };


  const filterFeatures = (feature) => {
    if (!selectedThreshold) return true; 
    return feature.properties.population >= selectedThreshold.threshold;
  };

  function filterGeoJsonDataByThreshold(originalGeoJsonData, selectedThreshold) {
    if (!selectedThreshold) {
      return originalGeoJsonData; // Return the original data unfiltered
    }
  
    const filteredFeatures = originalGeoJsonData.features.filter(feature => {
      if(feature!== undefined){
        const population = feature.properties.population;
  
        return population >= selectedThreshold.threshold;
      }

    });

    return {
      ...originalGeoJsonData,
      features: filteredFeatures
    };
  }

  useEffect(() => {
    // Initial fetch and enrichment of GeoJSON data
    updateMapData(selectedThreshold);
  }, [selectedThreshold]); // Rerun when selectedThreshold changes
  
  
  useEffect(() => {
    const mapInstance = mapRef.current;


    fetch("../../resources/countries.json")
      .then(response => response.json())
      .then(data => {
        enrichGeoJsonData(data);
      })
      .catch(err => console.error("Failed to load local GeoJSON:", err));

  }, []);

 
  const enrichGeoJsonData = async (geoJson) => {
    for (let feature of geoJson.features) {
      const countryName = feature.properties.name;
      const baseUrl = `https://d6wn6bmjj722w.population.io:443/1.0/population/`;
      const url = `${baseUrl}${encodeURIComponent(countryName)}/2023-12-24/`;
      const population = await fetch(url)
        .then(response => response.json())
        .then(data => {
          if(data) {
            return data.total_population.population;
          }

        })
        .catch(err => {
          console.error(`Failed to fetch population for ${countryName}:`, err);
          return null; 
        });

      feature.properties.population = population;
    }
    setGeojsonData(geoJson);
  };

  const getColor = (population) => {
    if (!population) return '#999999';
    return population > 100000000 ? '#800026' :
           population > 50000000  ? '#BD0026' :
           population > 20000000  ? '#E31A1C' :
           population > 10000000  ? '#FC4E2A' :
           population > 5000000   ? '#FD8D3C' :
           population > 2000000   ? '#FEB24C' :
                                    '#FFEDA0';
  };

  const geoJsonStyle = (feature) => ({
    fillColor: getColor(feature.properties.population),
    weight: 0.5,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 


  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      var pop = feature.properties.population
      const popupContent = `Country: ${feature.properties.name}<br>Population: ${pop || 'Data Not Available'}`;
      layer.bindPopup(popupContent);
    }
  };
  return (
    <div>
    
    <MapContainer center={[20, 0]} zoom={3} style={{ height: '90vh', width: '100vw' }} scrollWheelZoom={false}  key={selectedThreshold || 'default-key'} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojsonData && (
        <GeoJSON
          data={geojsonData}
          style={geoJsonStyle}
          filter={filterFeatures}
          ref={mapRef}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>

    <div className="dropdown">
      <select onChange={handleThresholdChange} defaultValue="">
        <option value="" disabled>Filter by Population</option>
        {populationRanges.map((range, index) => (
          <option key={index} value={range.label}>{range.label}</option>
        ))}
      </select>
      </div>
    </div>
  );
};  

export default MapComponent;