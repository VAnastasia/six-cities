import { useState } from 'react';
import { SortTypes } from '../../const';

type SortProps = {
  currentSortType: SortTypes;
  onChangeCurrentSortType: (type: SortTypes) => void;
}

function Sort({currentSortType, onChangeCurrentSortType }: SortProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const onClickSortList = () => {
    setIsOpen(!isOpen);
  };

  const onChangeSortType = (type: SortTypes) => {
    onChangeCurrentSortType(type);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onClickSortList}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={isOpen ? 'places__options places__options--custom places__options--opened' : ' places__options places__options--custom'}
      >
        {Object.values(SortTypes).map((type) => (
          <li
            key={type}
            className={type === currentSortType ? 'places__option places__option--active' : 'places__option'}
            tabIndex={0}
            onClick={() => onChangeSortType(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
