import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login-form/login-form';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import { getUser } from '../../store/auth/selectors';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';

function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const currentUser = useAppSelector(getUser);

  useEffect(() => {
    if (currentUser) {
      navigate(AppRoute.Main);
    }
  }, [navigate, currentUser]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <Helmet>
              <title>Sign in</title>
            </Helmet>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
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
