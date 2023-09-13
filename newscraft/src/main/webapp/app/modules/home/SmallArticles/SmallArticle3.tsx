import './style.css'
import './styles2.css'
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';


export const SmallArticle3 = () => {
  return (

          <div className="media">
            <div className="media-left">
              <img className="media-object" src="content/images/Taylor.png" alt="Caption" />
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="single.html" target="_self">You can host a private Swiftie party at a movie theater</a>
              </h3>
              <span className="media-date">September 14th, 2023 by: Heather Jones</span>

              <div className="widget_article_social">
        <span className="fafa-share-alt">
        <a href="single.html" target="_self"> <i className="fa fa-share-alt"></i>60</a> Likes
        </span>
                <span className="fafa-share-alt">
        <a href="single.html" target="_self"><i className="fa fa-comments-o"></i>15</a> Comments
        </span>
              </div>
            </div>
          </div>


  );
  };

  export default SmallArticle3;
