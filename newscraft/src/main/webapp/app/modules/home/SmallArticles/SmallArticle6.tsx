import './style.css'
import './styles2.css'
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';


export const SmallArticle6 = () => {
  return (

          <div className="media">
            <div className="media-left">
              <img className="media-object" src="content/images/Mountains.png" alt="Caption" />
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="/article/149" target="_self">The world’s biggest national park is larger than most countries</a>
              </h3>
              <span className="media-date">Sept 12th, 2023 by: Alice Potter</span>

              <div className="widget_article_social">
        <span className="fafa-share-alt">
        <a href="/article/149" target="_self"> <i className="fa fa-share-alt"></i>136</a> Likes
        </span>
                <span className="fafa-share-alt">
        <a href="/article/149" target="_self"><i className="fa fa-comments-o"></i>89</a> Comments
        </span>
              </div>
            </div>
          </div>


  );
  };

  export default SmallArticle6;
