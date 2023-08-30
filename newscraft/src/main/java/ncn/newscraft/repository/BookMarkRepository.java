package ncn.newscraft.repository;

import java.util.List;
import java.util.Optional;
import ncn.newscraft.domain.BookMark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BookMark entity.
 */
@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, Long> {
    default Optional<BookMark> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<BookMark> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<BookMark> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct bookMark from BookMark bookMark left join fetch bookMark.createdBy left join fetch bookMark.linksTo",
        countQuery = "select count(distinct bookMark) from BookMark bookMark"
    )
    Page<BookMark> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct bookMark from BookMark bookMark left join fetch bookMark.createdBy left join fetch bookMark.linksTo")
    List<BookMark> findAllWithToOneRelationships();

    @Query(
        "select bookMark from BookMark bookMark left join fetch bookMark.createdBy left join fetch bookMark.linksTo where bookMark.id =:id"
    )
    Optional<BookMark> findOneWithToOneRelationships(@Param("id") Long id);
}
