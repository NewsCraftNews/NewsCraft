import './style.css'
import './styles2.css'
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';


export const SmallArticle5 = () => {
  return (

          <div className="media">
            <div className="media-left">
              <img className="media-object" src="content/images/NSYNC.png" alt="Caption" />
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="single.html" target="_self">*NSYNC reunites at MTV Video Music Awards</a>
              </h3>
              <span className="media-date">September 13th, 2023 by: David White</span>

              <div className="widget_article_social">
        <span className="fafa-share-alt">
        <a href="single.html" target="_self"> <i className="fa fa-share-alt"></i>568</a> Likes
        </span>
                <span className="fafa-share-alt">
        <a href="single.html" target="_self"><i className="fa fa-comments-o"></i>400</a> Comments
        </span>
              </div>
            </div>
          </div>


  );
  };

  export default SmallArticle5;
