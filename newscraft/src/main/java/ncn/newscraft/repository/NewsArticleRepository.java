package ncn.newscraft.repository;

import java.util.List;
import java.util.Optional;
import ncn.newscraft.domain.NewsArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the NewsArticle entity.
 *
 * When extending this class, extend NewsArticleRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface NewsArticleRepository extends NewsArticleRepositoryWithBagRelationships, JpaRepository<NewsArticle, Long> {
    default Optional<NewsArticle> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<NewsArticle> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<NewsArticle> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct newsArticle from NewsArticle newsArticle left join fetch newsArticle.picture left join fetch newsArticle.author",
        countQuery = "select count(distinct newsArticle) from NewsArticle newsArticle"
    )
    Page<NewsArticle> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct newsArticle from NewsArticle newsArticle left join fetch newsArticle.picture left join fetch newsArticle.author"
    )
    List<NewsArticle> findAllWithToOneRelationships();

    @Query(
        "select newsArticle from NewsArticle newsArticle left join fetch newsArticle.picture left join fetch newsArticle.author where newsArticle.id =:id"
    )
    Optional<NewsArticle> findOneWithToOneRelationships(@Param("id") Long id);
}
