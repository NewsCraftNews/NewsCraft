import { INewsArticle } from 'app/shared/model/news-article.model';

export interface ICategory {
  id?: number;
  name?: string | null;
  articles?: INewsArticle[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
