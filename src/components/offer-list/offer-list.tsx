import cn from 'classnames';
import OfferCard from '../../components/offer-card/offer-card';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { CityMap, OfferCardType } from '../../const';
import { getActiveCity, getOffersByFilterSort } from '../../store/offers/selectors';
import { useAppSelector } from '../../hooks';
import styles from './offer-list.module.css';

function OfferList(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersBySortAndCity: Offer[] = useAppSelector(getOffersByFilterSort);

  return (
    <div className={cn('cities', styles.cities)}>
      <div className={cn('cities__places-container container', styles.container)}>
        <section className={cn('cities__places places', styles.places)}>
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersBySortAndCity.length} places to stay in {activeCity}</b>
          <Sort />
          <div className="cities__places-list places__list tabs__content">
            {offersBySortAndCity.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                cardType={OfferCardType.Cities}
              />
            ))}
          </div>
        </section>
        <div className={cn('cities__right-section', styles.map)}>
          <Map offers={offersBySortAndCity} city={CityMap[activeCity]} />
        </div>
      </div>
    </div>
  );
}

export default OfferList;
