import { useEffect } from 'react';
import OfferCard from '../../components/offer-card/offer-card';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Sort from '../../components/sort/sort';
import { Offer } from '../../types/offer';
import { Store, CityMap, OfferCardType } from '../../const';
import Map from '../../components/map/map';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSelectedOffer } from '../../store/offers/offers';
import { resetDetailsOffer } from '../../store/details/details';
import { getOffersByFilterSort } from '../../store/offers/selectors';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector((state) => state[Store.Offers].activeCity);
  const offersBySortAndCity: Offer[] = useAppSelector(getOffersByFilterSort);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSelectedOffer(null));
    dispatch(resetDetailsOffer());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
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
      </main>
    </div>
  );
}

export default MainPage;
