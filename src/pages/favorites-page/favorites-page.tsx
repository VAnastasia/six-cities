import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import Header from '../../components/header/header';
import styles from './favorites-page.module.css';
import FavoritesOffers from '../../components/favorites/favorites';
import { getFavoritesByCities } from '../../store/favorites/selectors';
import { useAppSelector } from '../../hooks';

function FavoritesPage(): JSX.Element {
  const favoritesByCities = useAppSelector(getFavoritesByCities);

  return (
    <div className={cn('page', styles.favorites)}>
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <Header />
      <main className={cn('page__main page__main--favorites', styles.main)}>
        <FavoritesOffers offers={favoritesByCities} />
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="/img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
