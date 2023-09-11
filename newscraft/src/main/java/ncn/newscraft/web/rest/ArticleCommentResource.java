package ncn.newscraft.web.rest;

import ncn.newscraft.domain.Comment;
import ncn.newscraft.domain.UserProfile;
import ncn.newscraft.repository.CommentRepository;
import ncn.newscraft.service.CommentService;
import ncn.newscraft.service.dto.CommentDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/**
 * REST controller for managing Comments for a specific Article.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ArticleCommentResource {
    private final Logger log = LoggerFactory.getLogger(CommentResource.class);

    private static final String ENTITY_NAME = "article_comment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommentService commentService;

    public ArticleCommentResource(CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     * {@code GET  /comments} : get all the comments linked to article with "id".
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comments in body.
     */
    @GetMapping("/news-articles/{id}/comments")
    public List<Comment> getAllComments(@PathVariable Long id) {
        log.debug("REST request to get Comment associated with Article : {}", id);
        return commentService.getCommentsByArticleId(id);
    }

    /**
     * {@code POST  /comments/:login/article} : get all the comments linked to article with "id".
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comments in body.
     */
    @PostMapping("/comments/{login}/article")
    public ResponseEntity<Comment> saveAComment(@PathVariable String login, @RequestBody Comment comment)
            throws URISyntaxException {
        log.debug("REST request to save Comment written by : {}", login);
        UserProfile up = commentService.findProfileByLogin(login);
        if (up == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        comment.setAuthor(up);
        Comment result = commentService.saveComment(comment);
        return ResponseEntity
            .created(new URI("/api/comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}
