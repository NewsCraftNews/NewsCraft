package ncn.newscraft.repository;

import java.util.List;
import java.util.Optional;
import ncn.newscraft.domain.NewsArticle;
import org.springframework.data.domain.Page;

public interface NewsArticleRepositoryWithBagRelationships {
    Optional<NewsArticle> fetchBagRelationships(Optional<NewsArticle> newsArticle);

    List<NewsArticle> fetchBagRelationships(List<NewsArticle> newsArticles);

    Page<NewsArticle> fetchBagRelationships(Page<NewsArticle> newsArticles);
}
