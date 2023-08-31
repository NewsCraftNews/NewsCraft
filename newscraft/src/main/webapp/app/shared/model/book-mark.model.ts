import { IUserProfile } from 'app/shared/model/user-profile.model';
import { INewsArticle } from 'app/shared/model/news-article.model';

export interface IBookMark {
  id?: number;
  createdBy?: IUserProfile | null;
  linksTo?: INewsArticle | null;
}

export const defaultValue: Readonly<IBookMark> = {};
