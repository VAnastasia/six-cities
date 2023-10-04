import cn from 'classnames';
import Comments from '../comments/comments';
import Map from '../map/map';
import { AppRoute, CityMap } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDetails } from '../../store/details/selectors';
import { getActiveCity, getOffersNearby } from '../../store/offers/selectors';
import { getUser } from '../../store/auth/selectors';
import { statusFavoriteAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';

function DetailsOffer(): JSX.Element {
  const navigate = useNavigate();
  const details = useAppSelector(getDetails);
  const activeCity = useAppSelector(getActiveCity);
  const offersNearby = useAppSelector(getOffersNearby);
  const currentUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const onBookmarkClick = () => {
    if (currentUser && details) {
      const favoriteStatus = !details.isFavorite;
      dispatch(statusFavoriteAction({ ...details, isFavorite: favoriteStatus }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {details?.images?.map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img
                className="offer__image"
                src={image}
                alt="Photo studio"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {details?.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>)}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {details?.title}
            </h1>
            <button
              className={cn(
                'offer__bookmark-button',
                'button',
                {'offer__bookmark-button--active': details?.isFavorite}
              )}
              type="button"
              onClick={onBookmarkClick}
            >
              <svg className="offer__bookmark-icon" width={31} height={33}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${Math.round(details?.rating ?? 0) * 20}%` }} />
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{details?.rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">{details?.type}</li>
            <li className="offer__feature offer__feature--bedrooms">
              {details?.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {details?.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{details?.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {details?.goods?.map((good) => (
                <li key={good} className="offer__inside-item">{good}</li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img
                  className="offer__avatar user__avatar"
                  src={details?.host?.avatarUrl}
                  width={74}
                  height={74}
                  alt={details?.host?.name}
                />
              </div>
              <span className="offer__user-name">{details?.host?.name}</span>
              {details?.host?.isPro && (
                <span className="offer__user-status">Pro</span>
              )}
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {details?.description}
              </p>
            </div>
          </div>
          <Comments />
        </div>
      </div>
      {!!details && (
        <div style={{width: '100%', height: '570px'}}>
          <Map offers={[...offersNearby, details]} city={CityMap[activeCity]} />
        </div>
      )}
    </section>
  );
}

export default DetailsOffer;
