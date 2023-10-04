import cn from 'classnames';
import { OfferCardType } from '../../const';
import { useAppSelector } from '../../hooks';
import { getOffersNearby } from '../../store/offers/selectors';
import OfferCard from '../offer-card/offer-card';
import styles from './near-places.module.css';

function NearPlaces(): JSX.Element {
  const offers = useAppSelector(getOffersNearby);

  return (
    <div className="container">
      <section className={cn('near-places places', styles.places)}>
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} cardType={OfferCardType.Nearby} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default NearPlaces;
