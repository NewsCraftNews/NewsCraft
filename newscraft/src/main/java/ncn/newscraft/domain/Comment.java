package ncn.newscraft.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * not an ignored comment
 */
@Schema(description = "not an ignored comment")
@Entity
@Table(name = "comment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "comment_text")
    private String commentText;

    @Column(name = "time_posted")
    private ZonedDateTime timePosted;

    @Column(name = "likes")
    private Integer likes;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private UserProfile author;

    @ManyToOne
    @JsonIgnoreProperties(value = { "picture", "author", "categories" }, allowSetters = true)
    private NewsArticle article;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Comment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentText() {
        return this.commentText;
    }

    public Comment commentText(String commentText) {
        this.setCommentText(commentText);
        return this;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public ZonedDateTime getTimePosted() {
        return this.timePosted;
    }

    public Comment timePosted(ZonedDateTime timePosted) {
        this.setTimePosted(timePosted);
        return this;
    }

    public void setTimePosted(ZonedDateTime timePosted) {
        this.timePosted = timePosted;
    }

    public Integer getLikes() {
        return this.likes;
    }

    public Comment likes(Integer likes) {
        this.setLikes(likes);
        return this;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public UserProfile getAuthor() {
        return this.author;
    }

    public void setAuthor(UserProfile userProfile) {
        this.author = userProfile;
    }

    public Comment author(UserProfile userProfile) {
        this.setAuthor(userProfile);
        return this;
    }

    public NewsArticle getArticle() {
        return this.article;
    }

    public void setArticle(NewsArticle newsArticle) {
        this.article = newsArticle;
    }

    public Comment article(NewsArticle newsArticle) {
        this.setArticle(newsArticle);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comment)) {
            return false;
        }
        return id != null && id.equals(((Comment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Comment{" +
            "id=" + getId() +
            ", commentText='" + getCommentText() + "'" +
            ", timePosted='" + getTimePosted() + "'" +
            ", likes=" + getLikes() +
            "}";
    }
}
