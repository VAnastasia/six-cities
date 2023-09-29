import { User } from './user';

export type Comment = {
  id: string;
  date: Date;
  user: User;
  comment: string;
  rating: number;
}
