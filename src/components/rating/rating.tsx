import { ChangeEvent, Fragment, memo } from 'react';

type RatingProps = {
  rating: number;
  setRating: (rating: number) => void;
  isDisable: boolean;
}

const RATING_DATA = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' }
] as const;

function Rating({ rating, setRating, isDisable }: RatingProps) {

  const onChangeRating = ({ target: { defaultValue } }: ChangeEvent<HTMLInputElement>) => {
    setRating(+defaultValue);
  };

  return (
    <div className="reviews__rating-form form__rating">
      {RATING_DATA.map(({ value, title }) =>
        (
          <Fragment key={`${value}-stars`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={onChangeRating}
              disabled={isDisable}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
    </div>
  );
}

const RatingMemo = memo(Rating);
export default RatingMemo;
