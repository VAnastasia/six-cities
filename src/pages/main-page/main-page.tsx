import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import OfferList from '../../components/offer-list/offer-list';
import Loader from '../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedOffer } from '../../store/offers/offers';
import { resetDetailsOffer } from '../../store/details/details';
import { getFetchingStatus } from '../../store/offers/selectors';
import { RequestStatus } from '../../const';

function MainPage(): JSX.Element {
  const isLoading = useAppSelector(getFetchingStatus) === RequestStatus.Pending;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSelectedOffer(null));
    dispatch(resetDetailsOffer());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main className="page__main page__main--index">
            <Helmet>
              <title>Cities</title>
            </Helmet>
            <Tabs />
            <OfferList />
          </main>
        </>
      )}
    </div>
  );
}

export default MainPage;
