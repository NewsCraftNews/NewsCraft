import userProfile from 'app/entities/user-profile/user-profile.reducer';
import comment from 'app/entities/comment/comment.reducer';
import bookMark from 'app/entities/book-mark/book-mark.reducer';
import newsArticle from 'app/entities/news-article/news-article.reducer';
import category from 'app/entities/category/category.reducer';
import picture from 'app/entities/picture/picture.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  userProfile,
  comment,
  bookMark,
  newsArticle,
  category,
  picture,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
