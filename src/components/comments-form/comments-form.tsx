import cn from 'classnames';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Rating from '../rating/rating';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSendingStatus } from '../../store/comments/selectors';
import { RequestStatus } from '../../const';
import { postCommentAction } from '../../store/api-actions';
import { getDetails } from '../../store/details/selectors';
import { getUser } from '../../store/auth/selectors';
import styles from './comments-form.module.css';

const DEFAULT_RATING = 5;

function CommentsForm(): JSX.Element {
  const offerId = useAppSelector(getDetails)?.id;
  const currentUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getSendingStatus);

  const [rating, setRating] = useState(DEFAULT_RATING);
  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(false);

  const onChangeComment = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.currentTarget.value);
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (offerId && !!currentUser) {
      dispatch(postCommentAction({
        offerId,
        comment: {
          comment,
          rating
        }
      }));
    }
  };

  useEffect(() => {
    const isValidRating = rating > 0 && rating <= DEFAULT_RATING;
    const isValidComment = comment.length >= 50 && comment.length <= 300;
    setIsValid(isValidRating && isValidComment);
  }, [rating, comment]);

  useEffect(() => {
    if (sendingStatus === RequestStatus.Success) {
      setComment('');
      setRating(DEFAULT_RATING);
    }
  }, [sendingStatus]);

  return (
    <form
      className={cn('reviews__form form', styles.form)}
      action="#"
      method="post"
      onSubmit={onSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating rating={rating} setRating={setRating} isDisable={sendingStatus === RequestStatus.Pending} />
      <textarea
        value={comment}
        onChange={onChangeComment}
        className={cn('reviews__textarea form__textarea', styles.textarea)}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        {!isValid ? (
          <p className={cn('reviews__help', styles.message)}>
          To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
            <b className="reviews__text-amount">50 characters</b>.
          </p>
        ) : (<p className="reviews__help"></p>)}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={sendingStatus === RequestStatus.Pending || !isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentsForm;
