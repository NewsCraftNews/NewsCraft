import './style.css'
import './styles2.css'
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';


export const SmallArticle4 = () => {
  return (

          <div className="media">
            <div className="media-left">
              <img className="media-object" src="content/images/Kelce.png" alt="Caption" />
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="/article/147" target="_self">‘Kelce,’ ‘Wrexham’ and ‘Wrestlers’ add to the wave of sports-related documentaries</a>
              </h3>
              <span className="media-date">Sept 13th, 2023 by: Alex Crank</span>

              <div className="widget_article_social">
        <span className="fafa-share-alt">
        <a href="/article/147" target="_self"> <i className="fa fa-share-alt"></i>458</a> Likes
        </span>
                <span className="fafa-share-alt">
        <a href="/article/147" target="_self"><i className="fa fa-comments-o"></i>203</a> Comments
        </span>
              </div>
            </div>
          </div>


  );
  };

  export default SmallArticle4;
