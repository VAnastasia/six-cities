import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { OfferCardType } from '../../const';

type FavoritesProps = {
  offers: {
    [key: string]: Offer[];
  };
}

function FavoritesOffers({offers}: FavoritesProps): JSX.Element {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        {Object.keys(offers).length ? <h1 className="favorites__title">Saved listing</h1> : <h1 className="favorites__title">Nothing yet saved</h1>}
        {Object.keys(offers).length > 0 && (
          <ul className="favorites__list">
            {Object.keys(offers).map((city) => (
              <li className="favorites__locations-items" key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {offers[city].map((offer: Offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      cardType={OfferCardType.Favorites}
                    />)
                  )}
                </div>
              </li>
            ))}
          </ul>)}
      </section>
    </div>
  );
}

export default FavoritesOffers;
