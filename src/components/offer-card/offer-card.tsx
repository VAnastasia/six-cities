import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedOffer } from '../../store/offers/offers';
import { AppRoute } from '../../const';
import { getUser } from '../../store/auth/selectors';
import { statusFavoriteAction } from '../../store/api-actions';
import { OfferCardType } from '../../const';
import styles from './offer-card.module.css';

type OfferProps = {
  offer: Offer;
  cardType: OfferCardType;
}

function OfferCard({ offer, cardType = OfferCardType.Cities }: OfferProps): JSX.Element {
  const { id, previewImage, type, title, rating, price, isPremium , isFavorite} = offer;
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);

  const currentUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onBookmarkClick = useCallback(() => {
    if (currentUser) {
      const newStatus = !favoriteStatus;
      dispatch(statusFavoriteAction({ ...offer, isFavorite: newStatus }))
        .then((res) => {
          if (res.type === 'data/statusFavorite/fulfilled') {
            setFavoriteStatus(newStatus);
          }
        });

    } else {
      navigate(AppRoute.Login);
    }
  }, [dispatch, currentUser, favoriteStatus, navigate, offer]);

  const onMouseOver = useCallback(() => {
    if (cardType === OfferCardType.Cities) {
      dispatch(setSelectedOffer(id));
    }
  }, [cardType, id, dispatch]);

  const onMouseLeave = useCallback(() => {
    if (cardType === OfferCardType.Cities) {
      dispatch(setSelectedOffer(null));
    }
  }, [cardType, dispatch]);

  return (
    <article
      className={cn(`${cardType}__card`, 'place-card', {[styles.favorite]: cardType === OfferCardType.Favorites})}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={cn('place-card__image-wrapper', `${cardType}__image-wrapper`, {[styles.image]: cardType === OfferCardType.Favorites})}>
        <Link to={`${AppRoute.Offer}${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardType === OfferCardType.Favorites ? 150 : 260}
            height={cardType === OfferCardType.Favorites ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cn('place-card__info', `${cardType}__card-info`)}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={cn('place-card__bookmark-button button', {
              'place-card__bookmark-button place-card__bookmark-button--active button': !!favoriteStatus
            })}
            type="button"
            onClick={onBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
