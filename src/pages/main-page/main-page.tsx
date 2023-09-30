import { useState } from 'react';
import OfferCard from '../../components/offer-card/offer-card';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Sort from '../../components/sort/sort';
import { Offer } from '../../types/offer';
import { SortTypes } from '../../const';
import { useSortedFiltredOffers } from '../../hooks/use-sorted-filtred-offers';

const DEFAULT_CITY = 'Paris';

type MainPageProps = {
  offers: Offer[];
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [activeCity, setActiveCity] = useState(DEFAULT_CITY);
  const [currentSortType, setCurrentSortType] = useState(SortTypes.Popular);

  const offersBySortAndCity: Offer[] = useSortedFiltredOffers(offers, currentSortType, activeCity);

  const onChangeActiveTab = (city: string) => {
    setActiveCity(city);
  };

  const onChangeCurrentSortType = (sortType: SortTypes) => {
    setCurrentSortType(sortType);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs
          activeCity={activeCity}
          onChangeActiveTab={onChangeActiveTab}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersBySortAndCity.length} places to stay in {activeCity}</b>
              <Sort
                currentSortType={currentSortType}
                onChangeCurrentSortType={onChangeCurrentSortType}
              />
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
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
