package ncn.newscraft.service.dto;

import ncn.newscraft.domain.Comment;

import java.time.ZonedDateTime;

public class CommentDTO {
    private Long comment_id;
    private String commentText;
    private ZonedDateTime timePosted;
    private Integer likes;
    private String author;
    private Long article_id;

    public CommentDTO() {
        // Empty constructor needed for Jackson.
    }

    public CommentDTO(Comment comment) {
        this.comment_id = comment.getId();
        this.commentText = comment.getCommentText();
        this.timePosted = comment.getTimePosted();
        this.likes = comment.getLikes();
        this.article_id = comment.getArticle() != null ? comment.getArticle().getId() : null;
        this.author = comment.getAuthor() != null ? comment.getAuthor().getLogin() : null;
    }

    public Long getCommentId() {
        return comment_id;
    }

    public void setCommentId(Long comment_id) {
        this.comment_id = comment_id;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public ZonedDateTime getTimePosted() {
        return timePosted;
    }

    public void setTimePosted(ZonedDateTime timePosted) {
        this.timePosted = timePosted;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Long getArticleId() {
        return article_id;
    }

    public void setArticle_id(Long articleId) {
        this.article_id = article_id;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommentDTO{" +
            "id='" + comment_id + '\'' +
            "author='" + author + '\'' +
            ", article='" + article_id + '\'' +
            "}";
    }
}
