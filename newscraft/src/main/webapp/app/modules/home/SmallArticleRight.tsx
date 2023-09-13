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
              <a href="#"><img className="media-object" src="https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg" alt="Generic placeholder image" /></a>
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="single.html" target="_self">Samsung galaxy note is the super mobile of all products.</a>
              </h3>
              <span className="media-date"><a href="#">10Aug- 2015</a>, by: <a href="#">Eric Joan</a></span>

              <div className="widget_article_social">
        <span>
        <a href="single.html" target="_self"> <i className="fa fa-share-alt"></i>424</a> Shares
        </span>
                <span>
        <a href="single.html" target="_self"><i className="fa fa-comments-o"></i>4</a> Comments
        </span>
              </div>
            </div>
          </div>
  );
  };

  export default SmallArticleRight;
