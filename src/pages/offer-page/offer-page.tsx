import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import DetailsOffer from '../../components/details-offer/details-offer';
import NearPlaces from '../../components/near-places/near-places';

import {
  fetchDetailsOfferAction,
  fetchCommentsAction,
  fetchOfferNearbyAction,
  fetchFavoritesAction
} from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

function OfferPage(): JSX.Element {
  const {id: offerId} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(offerId) {
      dispatch(fetchDetailsOfferAction(offerId));
      dispatch(fetchCommentsAction(offerId));
      dispatch(fetchOfferNearbyAction(offerId));
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, offerId]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <DetailsOffer />
        <NearPlaces />
      </main>
    </div>
  );
}

export default OfferPage;
