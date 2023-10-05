import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import DetailsOffer from '../../components/details-offer/details-offer';
import NearPlaces from '../../components/near-places/near-places';
import Loader from '../../components/loader/loader';
import {
  fetchDetailsOfferAction,
  fetchCommentsAction,
  fetchOfferNearbyAction,
} from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFetchingStatus } from '../../store/details/selectors';
import { RequestStatus } from '../../const';

function OfferPage(): JSX.Element {
  const {id: offerId} = useParams();
  const isLoading = useAppSelector(getFetchingStatus) === RequestStatus.Pending;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(offerId) {
      dispatch(fetchDetailsOfferAction(offerId));
      dispatch(fetchCommentsAction(offerId));
      dispatch(fetchOfferNearbyAction(offerId));
    }
  }, [dispatch, offerId]);

  return (
    <div className="page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main className="page__main page__main--offer">
            <DetailsOffer />
            <NearPlaces />
          </main>
        </>
      )}
    </div>
  );
}

export default OfferPage;
