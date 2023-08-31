import dayjs from 'dayjs';
import { IPicture } from 'app/shared/model/picture.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { ICategory } from 'app/shared/model/category.model';

export interface INewsArticle {
  id?: number;
  title?: string | null;
  articleText?: string | null;
  timePosted?: string | null;
  likes?: number | null;
  picture?: IPicture | null;
  author?: IUserProfile | null;
  categories?: ICategory[] | null;
}

export const defaultValue: Readonly<INewsArticle> = {};
