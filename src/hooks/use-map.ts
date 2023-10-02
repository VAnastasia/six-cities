import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer';

const TILE_LAYER_URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_OPTIONS_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null) {
      const { location: { latitude, longitude, zoom } } = city;
      if (!isRenderedRef.current) {
        const instance = new Map(mapRef.current, {
          center: {
            lat: latitude,
            lng: longitude
          },
          zoom
        });

        const layer = new TileLayer(
          TILE_LAYER_URL_TEMPLATE,
          {
            attribution: TILE_LAYER_OPTIONS_ATTRIBUTION
          }
        );

        instance.addLayer(layer);

        setMap(instance);
        isRenderedRef.current = true;
      } else {
        map?.setView([latitude, longitude], zoom);
      }
    }
  }, [mapRef, city, map]);

  return map;
};
