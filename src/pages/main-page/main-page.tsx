import { useEffect } from 'react';
import OfferCard from '../../components/offer-card/offer-card';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Sort from '../../components/sort/sort';
import { Offer } from '../../types/offer';
import { Store, CityMap } from '../../const';
import { useSortedFiltredOffers } from '../../hooks/use-sorted-filtred-offers';
import Map from '../../components/map/map';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import { setSelectedOffer } from '../../store/offers/offers';
import { getSortType } from '../../store/offers/selectors';

function MainPage(): JSX.Element {
  const sortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedOffer(null));
  }, [dispatch]);

  const activeCity = useAppSelector((state) => state[Store.Offers].activeCity);
  const offers = useAppSelector((state) => state[Store.Offers].offers);

  const offersBySortAndCity: Offer[] = useSortedFiltredOffers(offers, sortType, activeCity);
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
