import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import styled from "styled-components";


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

const StyledMapContainer= styled.div`
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
`

const Mapbox = ({coordinates = [], center = [0, 0], zoom = 15}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
    });

    coordinates.forEach(lngLat => {
      new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current)
    });
  });

  return (
    <StyledMapContainer ref={mapContainer} className="map-container" >

    </StyledMapContainer>
  );
};

export default Mapbox;
