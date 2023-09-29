type TabProps = {
  city: string;
  isActive: boolean;
  onClick: (city: string) => void;
}

function Tab({ city, isActive, onClick }: TabProps): JSX.Element {
  const clickhandler = () => {
    onClick(city);
  };

  return (
    <li className='locations__item' key={city}>
      <a className={isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#" onClick={clickhandler}>
        <span>{city}</span>
      </a>
    </li>
  );
}


export default Tab;

