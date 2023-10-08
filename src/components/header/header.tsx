import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Logo from '../logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';
import { logoutAction, fetchFavoritesAction } from '../../store/api-actions';
import { getUser } from '../../store/auth/selectors';
import { getFavorites } from '../../store/favorites/selectors';
import styles from './header.module.css';

function Header(): JSX.Element {
  const currentUser = useAppSelector(getUser);
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  const logout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, currentUser]);

  return (
    <header className="header">
      <div className={cn('container', styles.container)}>
        <div className={cn('header__wrapper', styles.wrapper)}>
          <div className="header__left">
            <Logo/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {currentUser &&
              <li className="header__nav-item user">
                <Link
                  to={AppRoute.Favorites}
                  className="header__nav-link header__nav-link--profile"
                >
                  <div className={cn('header__avatar-wrapper user__avatar-wrapper', styles.avatar)}>
                    <img src={currentUser.avatarUrl} alt={currentUser.name} />
                  </div>
                  <span className={cn('header__user-name user__name', styles.username)}>
                    {currentUser?.email}
                  </span>
                  {currentUser && <span className="header__favorite-count">{favorites.length}</span>}
                </Link>
              </li>}

              <li className="header__nav-item">
                {currentUser ?
                  <a className="header__nav-link" href="#" onClick={logout}>
                    <span className="header__signout">Sign out</span>
                  </a> :
                  <Link to={AppRoute.Login}>
                    <span className="header__signout">Log in</span>
                  </Link>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
