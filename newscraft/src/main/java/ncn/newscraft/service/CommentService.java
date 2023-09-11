package ncn.newscraft.service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import ncn.newscraft.domain.Comment;
import ncn.newscraft.domain.NewsArticle;
import ncn.newscraft.domain.UserProfile;
import ncn.newscraft.repository.CommentRepository;
import ncn.newscraft.repository.NewsArticleRepository;
import ncn.newscraft.repository.UserProfileRepository;
import ncn.newscraft.service.dto.CommentDTO;
import ncn.newscraft.service.mapper.CommentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.util.stream.Collectors.toList;

/**
 * Service class for managing comments.
 */
@Service
@Transactional
public class CommentService {
    private final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;

    private final UserProfileRepository userProfileRepository;

    private final CommentMapper mapper;

    private final NewsArticleRepository newsArticleRepository;

    private final CacheManager cacheManager;

    public CommentService(
        CommentRepository commentRepository,
        UserProfileRepository userProfileRepository,
        NewsArticleRepository newsArticleRepository,
        CommentMapper mapper,
        CacheManager cacheManager
    ) {
        this.commentRepository = commentRepository;
        this.userProfileRepository = userProfileRepository;
        this.newsArticleRepository = newsArticleRepository;
        this.mapper = mapper;
        this.cacheManager = cacheManager;
    }

    public List<CommentDTO> getAllComments() {
        return mapper.commentsToCommentDTOs(commentRepository.findAllWithEagerRelationships());
    }

    public List<Comment> getCommentsByArticleId(Long article_id) {
        return getAllComments()
            .stream()
            .filter(commentDTO -> commentDTO.getArticleId() != null)
            .filter(commentDTO -> commentDTO.getArticleId().equals(article_id))
            .map(commentDTO -> mapper.dtoToComment(commentDTO))
            .collect(toList());
    }

    public List<Comment> getCommentsByLogin(String login) {
        return getAllComments()
            .stream()
            .filter(commentDTO -> commentDTO.getAuthor() != null)
            .filter(commentDTO -> commentDTO.getAuthor().equals(login))
            .map(commentDTO -> mapper.dtoToComment(commentDTO))
            .collect(toList());
    }

    public UserProfile findProfileByLogin(String login){
        List<UserProfile> user = userProfileRepository.findAllWithEagerRelationships()
            .stream()
            .filter(profile -> profile.getUser() != null)
            .filter(profile -> profile.getUser().getLogin().equals(login))
            .collect(toList());
        if(!user.isEmpty()) return user.get(0);
        return null;
    }

    public Comment saveComment(Comment comment) {
        Optional<NewsArticle> na = newsArticleRepository.findById(comment.getArticle().getId());
        comment.setArticle(na.get());
        return commentRepository.save(comment);
    }
}
