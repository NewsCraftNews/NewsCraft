package ncn.newscraft.repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ncn.newscraft.domain.NewsArticle;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class NewsArticleRepositoryWithBagRelationshipsImpl implements NewsArticleRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<NewsArticle> fetchBagRelationships(Optional<NewsArticle> newsArticle) {
        return newsArticle.map(this::fetchCategories);
    }

    @Override
    public Page<NewsArticle> fetchBagRelationships(Page<NewsArticle> newsArticles) {
        return new PageImpl<>(
            fetchBagRelationships(newsArticles.getContent()),
            newsArticles.getPageable(),
            newsArticles.getTotalElements()
        );
    }

    @Override
    public List<NewsArticle> fetchBagRelationships(List<NewsArticle> newsArticles) {
        return Optional.of(newsArticles).map(this::fetchCategories).orElse(Collections.emptyList());
    }

    NewsArticle fetchCategories(NewsArticle result) {
        return entityManager
            .createQuery(
                "select newsArticle from NewsArticle newsArticle left join fetch newsArticle.categories where newsArticle is :newsArticle",
                NewsArticle.class
            )
            .setParameter("newsArticle", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<NewsArticle> fetchCategories(List<NewsArticle> newsArticles) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, newsArticles.size()).forEach(index -> order.put(newsArticles.get(index).getId(), index));
        List<NewsArticle> result = entityManager
            .createQuery(
                "select distinct newsArticle from NewsArticle newsArticle left join fetch newsArticle.categories where newsArticle in :newsArticles",
                NewsArticle.class
            )
            .setParameter("newsArticles", newsArticles)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
