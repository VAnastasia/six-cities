import { memo, useEffect, useRef } from 'react';
import {useMap} from '../../hooks/use-map';
import { Offer, City } from '../../types/offer';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { MapSettings, ResourcePath } from '../../const';
// import classNames from 'classnames';
// import { getOfferSelected } from '../../store/cities-process/selectors';
import { useAppSelector } from '../../hooks';
import { getSelectedOffer } from '../../store/offers/selectors';

type MapProps = {
  offers: Offer[];
  city: City;
}

const getDefaultCustomIcon = (): Icon => new Icon({
  iconUrl: ResourcePath.Pin,
  iconSize: [MapSettings.PinIconSizeX, MapSettings.PinIconSizeY],
  iconAnchor: [MapSettings.PinIconAnchorX, MapSettings.PinIconAnchorY]
});

const getCurrentCustomIcon = (): Icon => new Icon({
  iconUrl: ResourcePath.PinActive,
  iconSize: [MapSettings.PinActiveIconSizeX, MapSettings.PinActiveIconSizeY],
  iconAnchor: [MapSettings.PinActiveIconAnchorX, MapSettings.PinActiveIconAnchorY]
});

function Map({ city, offers }: MapProps): JSX.Element {
  const refMap = useRef<HTMLElement | null>(null);
  const map = useMap(refMap, city);

  const selectedOfferId = useAppSelector(getSelectedOffer);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const { id, location: { latitude, longitude }} = offer;
        const marker = new Marker({
          lat: latitude,
          lng: longitude
        });

        marker
          .setIcon(
            !!selectedOfferId && id === selectedOfferId
              ? getCurrentCustomIcon()
              : getDefaultCustomIcon()
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section ref={refMap} className='map' style={{width: '100%'}}></section>
  );
}

const MapMemo = memo(Map);
export default MapMemo;
