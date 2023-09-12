import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {IComment} from "app/shared/model/comment.model";
import {createComment, createEntity} from "app/entities/comment/comment.reducer";
import {useAppDispatch, useAppSelector} from "app/config/store";
import {useParams} from "react-router-dom";
import login from "app/modules/login/login";
import {useEffect, useState} from "react";
import {getUserSpecificEntity} from "app/entities/book-mark/book-mark.reducer";
import {IUserProfile} from "app/shared/model/user-profile.model";
import {INewsArticle} from "app/shared/model/news-article.model";
import { IArticleProps } from "app/HomePage/savearticle";

export const CommentBox = (props: IArticleProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  // const [updated, setUpdated] = useState(text);


  const {id} = useParams<'id'>();

  const login = useAppSelector(state => state.authentication.account.login);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const commentEntity = useAppSelector(state => state.comment.entity);
  const updateSuccess = useAppSelector(state => state.comment.updateSuccess);

  useEffect(() => {
    dispatch(getUserSpecificEntity({login, id}));
  }, [login, id]);

  useEffect(() => {
    if (updateSuccess) {
      // handleClose();
      console.log("hey, it works")
    }
  }, [updateSuccess]);

  const handleChange = (event) => {
    setText(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();

    const entity = {
      commentText: text,
      timePosted: new Date().toISOString(),
      article: props.article
    }
//     entity.article.id = id;
    console.log(entity);
    dispatch(createComment({login, entity}));
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '50ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleClick}>
        <TextField
          id="comment-box"
          label="Write Comment"
          multiline
          rows={4}
          value={text}
          onChange={handleChange}
        />
        <br />
        <Button className="me-2" color="info" type="submit" onClick={(event) => handleClick(event)}>Post</Button>
      </form>
      <br/>
    </Box>
  );
}

export default CommentBox;

