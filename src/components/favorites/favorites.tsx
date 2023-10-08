import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { AppRoute, OfferCardType } from '../../const';
import { useAppSelector } from '../../hooks';
import { getActiveCity } from '../../store/offers/selectors';
import styles from './favorires.module.css';

type FavoritesProps = {
  offers: {
    [key: string]: Offer[];
  };
}

function FavoritesOffers({offers}: FavoritesProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);

  return (
    <div className={cn('page__favorites-container container', styles.container)}>
      <section className="favorites">
        {Object.keys(offers).length ? <h1 className="favorites__title">Saved listing</h1> : <h1 className="favorites__title">Nothing yet saved</h1>}
        {Object.keys(offers).length > 0 && (
          <ul className="favorites__list">
            {Object.keys(offers).map((city) => (
              <li className={cn('favorites__locations-items', styles.location)} key={city}>
                <div className={cn('favorites__locations locations', styles.city, {'locations--current': activeCity === city})}>
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className={cn('favorites__places', styles.places)}>
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
