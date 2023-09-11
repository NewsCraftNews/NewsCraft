package ncn.newscraft.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Task entity.\n@author The JHipster team.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Schema(description = "Task entity.\n@author The JHipster team.")
@Entity
@Table(name = "news_article")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NewsArticle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "article_text")
    private String articleText;

    @Column(name = "time_posted")
    private ZonedDateTime timePosted;

    @Column(name = "likes")
    private Integer likes;

    @OneToOne
    @JoinColumn(unique = true)
    private Picture picture;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private UserProfile author;

    @ManyToMany
    @JoinTable(
        name = "rel_news_article__categories",
        joinColumns = @JoinColumn(name = "news_article_id"),
        inverseJoinColumns = @JoinColumn(name = "categories_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "articles" }, allowSetters = true)
    private Set<Category> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NewsArticle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public NewsArticle title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArticleText() {
        return this.articleText;
    }

    public NewsArticle articleText(String articleText) {
        this.setArticleText(articleText);
        return this;
    }

    public void setArticleText(String articleText) {
        this.articleText = articleText;
    }

    public ZonedDateTime getTimePosted() {
        return this.timePosted;
    }

    public NewsArticle timePosted(ZonedDateTime timePosted) {
        this.setTimePosted(timePosted);
        return this;
    }

    public void setTimePosted(ZonedDateTime timePosted) {
        this.timePosted = timePosted;
    }

    public Integer getLikes() {
        return this.likes;
    }

    public NewsArticle likes(Integer likes) {
        this.setLikes(likes);
        return this;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Picture getPicture() {
        return this.picture;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    public NewsArticle picture(Picture picture) {
        this.setPicture(picture);
        return this;
    }

    public UserProfile getAuthor() {
        return this.author;
    }

    public void setAuthor(UserProfile userProfile) {
        this.author = userProfile;
    }

    public NewsArticle author(UserProfile userProfile) {
        this.setAuthor(userProfile);
        return this;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public NewsArticle categories(Set<Category> categories) {
        this.setCategories(categories);
        return this;
    }

    public NewsArticle addCategories(Category category) {
        this.categories.add(category);
        category.getArticles().add(this);
        return this;
    }

    public NewsArticle removeCategories(Category category) {
        this.categories.remove(category);
        category.getArticles().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NewsArticle)) {
            return false;
        }
        return id != null && id.equals(((NewsArticle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NewsArticle{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", articleText='" + getArticleText() + "'" +
            ", timePosted='" + getTimePosted() + "'" +
            ", likes=" + getLikes() +
            "}";
    }
}
