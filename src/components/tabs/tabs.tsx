import { CityMap, City } from '../../const';
import Tab from '../tab/tab';

function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
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
