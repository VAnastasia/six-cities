import { City } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCity } from '../../store/offers/offers';
import { getActiveCity } from '../../store/offers/selectors';

type TabProps = {
  city: City;
}

function Tab({ city }: TabProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

  const clickHandler = (evt: React.MouseEvent | React.KeyboardEvent) => {
    evt.preventDefault();
    dispatch(setActiveCity(city));
  };

  return (
    <li className='locations__item' key={city}>
      <a className={activeCity === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#" onClick={clickHandler}>
        <span>{city}</span>
      </a>
    </li>
  );
}


export default Tab;

