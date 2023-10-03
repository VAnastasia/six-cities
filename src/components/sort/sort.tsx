import { useState } from 'react';
import { SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType } from '../../store/offers/offers';
import { getSortType } from '../../store/offers/selectors';

function Sort(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const sortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();

  const onClickSortList = () => {
    setIsOpen(!isOpen);
  };

  const onChangeSortType = (type: SortType) => {
    dispatch(setSortType(type));
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
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={isOpen ? 'places__options places__options--custom places__options--opened' : ' places__options places__options--custom'}
      >
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={type === sortType ? 'places__option places__option--active' : 'places__option'}
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
