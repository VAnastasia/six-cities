import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';
import { logoutAction, fetchFavoritesAction } from '../../store/api-actions';
import { getUser } from '../../store/auth/selectors';
import { getFavorites } from '../../store/favorites/selectors';

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
      <div className="container">
        <div className="header__wrapper">
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
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} />
                  </div>
                  <span className="header__user-name user__name">
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
