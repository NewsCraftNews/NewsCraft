package ncn.newscraft.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BookMark.
 */
@Entity
@Table(name = "book_mark")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BookMark implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private UserProfile createdBy;

    @ManyToOne
    @JsonIgnoreProperties(value = { "picture", "author", "categories" }, allowSetters = true)
    private NewsArticle linksTo;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BookMark id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserProfile getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(UserProfile userProfile) {
        this.createdBy = userProfile;
    }

    public BookMark createdBy(UserProfile userProfile) {
        this.setCreatedBy(userProfile);
        return this;
    }

    public NewsArticle getLinksTo() {
        return this.linksTo;
    }

    public void setLinksTo(NewsArticle newsArticle) {
        this.linksTo = newsArticle;
    }

    public BookMark linksTo(NewsArticle newsArticle) {
        this.setLinksTo(newsArticle);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookMark)) {
            return false;
        }
        return id != null && id.equals(((BookMark) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookMark{" +
            "id=" + getId() +
            "}";
    }
}
