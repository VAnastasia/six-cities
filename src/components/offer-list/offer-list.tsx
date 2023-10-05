import OfferCard from '../../components/offer-card/offer-card';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { CityMap, OfferCardType } from '../../const';
import { getActiveCity, getOffersByFilterSort } from '../../store/offers/selectors';
import { useAppSelector } from '../../hooks';

function OfferList(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersBySortAndCity: Offer[] = useAppSelector(getOffersByFilterSort);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
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
        <div className="cities__right-section">
          <Map offers={offersBySortAndCity} city={CityMap[activeCity]} />
        </div>
      </div>
    </div>
  );
}

export default OfferList;
