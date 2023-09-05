import './footer.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';

// const faPropIcon = faGithub as IconProp;

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>Created by:&nbsp;
          <a href="https://www.linkedin.com/in/oahmed105/" target="_blank" rel="noopener noreferrer">
            Osama Ahmed
          </a>
          ,&nbsp;
          <a href="https://www.linkedin.com/in/ctgao2/" target="_blank" rel="noopener noreferrer">
            Christine Gao
          </a>
          ,&nbsp;
          <a href="https://www.linkedin.com/in/danielle-n-greene/" target="_blank" rel="noopener noreferrer">
            Danielle Greene
          </a>
          ,&nbsp;
          <a href="https://www.linkedin.com/in/santosherreralopez/" target="_blank" rel="noopener noreferrer">
            Santos Herrera-Lopez
          </a>
        </p>
      </Col>
    </Row>
    <Row>
      <p>Source Code:&nbsp;
        <a href="https://github.com/NewsCraftNews/NewsCraft/tree/main" target="_blank" rel="noopener noreferrer">
{/*           <FontAwesomeIcon icon={['fa', 'github']} /> */}
          Github
        </a>
      </p>
    </Row>
  </div>
);

export default Footer;
