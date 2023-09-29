import { CITIES } from '../../const';
import Tab from '../tab/tab';

type TabsProps = {
  activeCity: string;
  onChangeActiveTab: (tab: string) => void;
}

function Tabs({ activeCity, onChangeActiveTab }: TabsProps): JSX.Element {
  const onClickTab = (tab: string) => {
    onChangeActiveTab(tab);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <Tab
              key={city}
              city={city}
              onClick={onClickTab}
              isActive={activeCity === city}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
