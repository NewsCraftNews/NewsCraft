import dayjs from 'dayjs';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { INewsArticle } from 'app/shared/model/news-article.model';

export interface IComment {
  id?: number;
  commentText?: string | null;
  timePosted?: string | null;
  likes?: number | null;
  author?: IUserProfile | null;
  article?: INewsArticle | null;
}

export const defaultValue: Readonly<IComment> = {};
