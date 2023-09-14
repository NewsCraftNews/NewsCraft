import './style.css'
import './styles2.css'
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';


export const SmallArticleRight = () => {
  return (
    <div className="media">
      <div className="media-left">
        <img className="media-object" src="content/images/volcano.png" alt="Caption" />
      </div>
      <div className="media-body">
        <h3 className="media-heading">
          <a href="single.html" target="_self">Hawaii’s Kilauea volcano is erupting again after months of quiet</a>
        </h3>
        <span className="media-date">Sept 14th, 2023 by: Anna Lewis</span>

        <div className="widget_article_social">
          <span className="fafa-share-alt">
            <a href="single.html" target="_self">48</a> Likes
          </span>
          <span className="fafa-share-alt">
            <a href="single.html" target="_self">13</a> Comments
          </span>
        </div>
      </div>
    </div>

  );
};

export default SmallArticleRight;
