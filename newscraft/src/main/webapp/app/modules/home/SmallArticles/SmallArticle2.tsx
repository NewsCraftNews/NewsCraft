 import './style.css'
import './styles2.css'
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';


export const SmallArticle2 = () => {
  return (

          <div className="media">
            <div className="media-left">
              <img className="media-object" src="content/images/Space.png" alt="Caption" />
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="/article/145" target="_self">Astronaut Frank Rubio sets US record for longest trip in space</a>
              </h3>
              <span className="media-date">Sept 14th, 2023 by: Jack Hailey</span>

              <div className="widget_article_social">
        <span className="fafa-share-alt">
        <a href="/article/145" target="_self"> <i className="fa fa-share-alt"></i>106</a> Likes
        </span>
                <span className="fafa-share-alt">
        <a href="/article/145" target="_self"><i className="fa fa-comments-o"></i>36</a> Comments
        </span>
              </div>
            </div>
          </div>


  );
  };

  export default SmallArticle2;
