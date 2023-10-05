import { memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../../hooks/use-map';
import { Offer, City } from '../../types/offer';
import { MapSettings, ResourcePath } from '../../const';
import { useAppSelector } from '../../hooks';
import { getSelectedOffer } from '../../store/offers/selectors';
import { getDetails } from '../../store/details/selectors';

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
  const {id: offerId} = useParams();

  const selectedOfferId = useAppSelector(getSelectedOffer);
  const detailsOffer = useAppSelector(getDetails);

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
            (!!selectedOfferId && id === selectedOfferId) || (offerId && detailsOffer && id === detailsOffer.id)
              ? getCurrentCustomIcon()
              : getDefaultCustomIcon()
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId, detailsOffer, offerId]);

  return (
    <section ref={refMap} className='map' style={{width: '100%', height: '100%'}}></section>
  );
}

const MapMemo = memo(Map);
export default MapMemo;
