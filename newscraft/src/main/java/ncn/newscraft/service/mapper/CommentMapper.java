package ncn.newscraft.service.mapper;

import ncn.newscraft.domain.Comment;
import ncn.newscraft.domain.User;
import ncn.newscraft.domain.UserProfile;
import ncn.newscraft.service.dto.CommentDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CommentMapper {
    public List<CommentDTO> commentsToCommentDTOs(List<Comment> comments) {
        return comments.stream().filter(Objects::nonNull).map(this::commentToDTO).collect(Collectors.toList());
    }

    public List<Comment> commentDTOsToComments(List<CommentDTO> commentDTOs) {
        return commentDTOs.stream().filter(Objects::nonNull).map(this::dtoToComment).collect(Collectors.toList());
    }

    public Comment dtoToComment(CommentDTO commentDTO){
        if(commentDTO != null){
            Comment comment = new Comment();
            comment.setId(commentDTO.getCommentId());
            comment.setCommentText(commentDTO.getCommentText());
            comment.setTimePosted(commentDTO.getTimePosted());
            comment.setLikes(commentDTO.getLikes());
            // article doesn't get set

            // author gets very BARELY set up
            // id and user is NULL
            UserProfile up = new UserProfile();
            up.setLogin(commentDTO.getAuthor());
            comment.setAuthor(up);

            return comment;
        }
        return null;
    }

    public CommentDTO commentToDTO(Comment comment){
        return new CommentDTO(comment);
    }
}
