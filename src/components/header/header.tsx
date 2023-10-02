import Logo from '../logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getUser } from '../../store/auth/selectors';

function Header(): JSX.Element {
  const currentUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const logout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

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
                <a
                  className="header__nav-link header__nav-link--profile"
                  href="#"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    {currentUser?.email}
                  </span>
                  <span className="header__favorite-count">3</span>
                </a>
              </li>}

              <li className="header__nav-item">
                {currentUser ?
                  <a className="header__nav-link" href="#" onClick={logout}>
                    <span className="header__signout">Sign out</span>
                  </a> :
                  <Link to={AppRoute.Login}>
                    <span className="header__signout">Sign in</span>
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
