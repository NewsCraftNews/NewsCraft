import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextFormat} from "react-jhipster";
import {APP_TIMESTAMP_FORMAT} from "app/config/constants";
import {IComment} from "app/shared/model/comment.model";

export interface ICommentProps {
  comments: IComment;
}

export const BoxComponent = (props:ICommentProps) => {
  return (
    <div className="card bg-secondary mb-3" style={{padding:'1.5rem'}}>
      <p key={`category-${props.comments.id}`}>
        Written by&nbsp;
        {props.comments.author.login}
        <br/>
        Posted on&nbsp;
        {<TextFormat value={props.comments.timePosted} type="date" format={APP_TIMESTAMP_FORMAT}/>}
        <br/>
        {props.comments.commentText}
      </p>
    </div>
  );
}

export default BoxComponent;

