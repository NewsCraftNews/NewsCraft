import './footer.scss';

import React from 'react';

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
  </div>
);

export default Footer;
