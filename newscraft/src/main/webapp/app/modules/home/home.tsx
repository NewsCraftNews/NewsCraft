import './home.scss';
import './grids.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';
import News from './BreakingNewsComponent';



export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  // @ts-ignore
  return (
    <Row>
      {account?.login ? (
        <h2>Welcome, News Crafter!</h2>
      ) : (
        <h2>Welcome, News Reader!</h2>
      )}

      <Col md="9">
        <Row>
          <div className="grid-container">
            <News /><div/> <News />

          </div>


    </Row>
        <br/>

        <p className="lead">This is your homepage</p>
        {account?.login ? (
          <div>
            <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert>
          </div>
        ) : (
          <div>

          </div>
        )}

        <p>
          If you like this project, don&apos;t forget to give us a star on{' '}
          <a href="https://github.com/NewsCraftNews/NewsCraft/tree/main" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !

        </p>

      </Col>

    </Row>

  );
};

export default Home;



