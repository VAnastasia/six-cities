import cn from 'classnames';
import { CityMap, City } from '../../const';
import Tab from '../tab/tab';
import styles from './tabs.module.css';

function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className={cn('locations container', styles.container)}>
        <ul className="locations__list tabs__list">
          {Object.keys(CityMap).map((city) => (
            <Tab
              key={city}
              city={city as City}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
