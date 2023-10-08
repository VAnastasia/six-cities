import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import LoginForm from '../../components/login-form/login-form';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import { getUser } from '../../store/auth/selectors';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import styles from './login-page.module.css';

function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const currentUser = useAppSelector(getUser);

  useEffect(() => {
    if (currentUser) {
      navigate(AppRoute.Main);
    }
  }, [navigate, currentUser]);

  return (
    <div className={cn('page page--gray page--login', styles.page)}>
      <header className="header">
        <div className={cn('container', styles.container)}>
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className={cn('page__login-container container', styles.container)}>
          <section className={cn('login', styles.login)}>
            <Helmet>
              <title>Sign in</title>
            </Helmet>
            <LoginForm />
          </section>
          <section className={cn('locations locations--login locations--current', styles.locations)}>
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
