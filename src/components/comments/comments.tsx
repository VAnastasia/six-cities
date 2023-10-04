import { useAppSelector } from '../../hooks';
import { getComments } from '../../store/comments/selectors';
import CommentsForm from '../comments-form/comments-form';

const formatDate = (date: string) => `${new Date(date).toLocaleString('en-US', { month: 'long' })} ${new Date(date).getFullYear() }`;

function Comments(): JSX.Element {
  const comments = useAppSelector(getComments);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <li className="reviews__item" key={comment.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                {!!comment.user && (
                  <img
                    className="reviews__avatar user__avatar"
                    src={comment.user.avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />)}
              </div>
              {!!comment.user && (<span className="reviews__user-name">{comment.user.name}</span>)}
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: `${comment.rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {comment.comment}
              </p>
              {!!comment.date && (
                <time className="reviews__time" dateTime={comment.date.substring(0, 10)}>
                  {formatDate(comment.date)}
                </time>)}
            </div>
          </li>
        ))}
      </ul>
      <CommentsForm />
    </section>
  );
}


export default Comments;
