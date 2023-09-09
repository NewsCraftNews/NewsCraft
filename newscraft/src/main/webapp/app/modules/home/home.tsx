import './home.scss';
import './grids.css';
import './articleElementStyle.css'
import './style.css'
import './styles2.css'
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';
import News from './BreakingNewsComponent';
import WeatherApp from "app/modules/home/WeatherApp";


export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);


  return (
    <Row>
      {account?.login ? (
        <h2>Welcome, News Crafter!</h2>
      ) : (
        <h2>Welcome, News Reader!</h2>
      )}



      <br/>
      <Col md="8">
        <Row>
          <div className="grid-container">
            <div className="article-container">
            <h1 className="article-title">Breaking News: Exciting Headline Here</h1>
            <p className="article-meta">Published on September 8, 2023 by Your Name</p>
            <img className="article-image" src="https://www.atptour.com/-/media/images/news/2023/09/08/01/19/medvedev-us-open-2023-sf-preview.jpg" alt="News Image"/>
              <p className="article-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ex eu quam efficitur congue vel a sem. Vestibulum vel vehicula lorem. Fusce aliquet urna quis fermentum.
              </p>
              <p className="article-content">
                Nunc consectetur orci ut justo tincidunt, sit amet dignissim quam vehicula. Curabitur a erat vel urna feugiat dictum eget eget ipsum. Nullam scelerisque fringilla diam, vel iaculis odio consequat non. Duis vitae justo et justo congue commodo.
              </p>
          </div>
            <div>
            <News />
              <br/><br/>
              <WeatherApp />
            </div>
            <div />

          </div>





          <section id="feature_news_section" className="feature_news_section">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div >
                    <div className="feature_article_img">
                      <img
                        className="img-responsive top_static_article_img"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1200px-Red_Panda_%2824986761703%29.jpg"
                        alt="feature-top"
                      />
                    </div>

                    <div className="feature_article_inner">
                      <div className="tag_lg red">
                        <a href="category.html">Hot News</a>
                      </div>
                      <div className="feature_article_title">
                        <h1>
                          <a href="single.html" target="_self">
                            Chevrolet car-saving technology delivers{' '}
                          </a>
                        </h1>
                      </div>

                      <div className="feature_article_date">
                        <a href="#" target="_self">
                          Stive Clark
                        </a>
                        ,<a href="#" target="_self">
                        Aug 4, 2015
                      </a>
                      </div>

                      <div className="feature_article_content">
                        In a move to address mounting concerns about security on Android, Google and Samsung are now issuing.
                      </div>

                      <div className="article_social">
                  <span>
                    <i className="fa fa-share-alt"></i>
                    <a href="#">424</a>Shares
                  </span>
                        <span>
                    <i className="fa fa-comments-o"></i>
                    <a href="#">4</a>Comments
                  </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="feature_static_wrapper">
                    <div className="feature_article_img">
                      <img className="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1200px-Red_Panda_%2824986761703%29.jpg" alt="feature-top" />
                    </div>

                    <div className="feature_article_inner">
                      <div className="tag_lg purple">
                        <a href="category.html">Top Viewed</a>
                      </div>
                      <div className="feature_article_title">
                        <h1>
                          <a href="single.html" target="_self">
                            Calculate's $180 Idol 3 4.7 is a{' '}
                          </a>
                        </h1>
                      </div>

                      <div className="feature_article_date">
                        <a href="#" target="_self">
                          Stive Clark
                        </a>
                        ,<a href="#" target="_self">
                        Aug 4, 2015
                      </a>
                      </div>

                      <div className="feature_article_content">
                        In a move to address mounting concerns about security on Android...
                      </div>

                      <div className="article_social">
                  <span>
                    <i className="fa fa-share-alt"></i>
                    <a href="#">424</a>Shares
                  </span>
                        <span>
                    <i className="fa fa-comments-o"></i>
                    <a href="#">4</a>Comments
                  </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="feature_static_last_wrapper">
                    <div className="feature_article_img">
                      <img className="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1200px-Red_Panda_%2824986761703%29.jpg" alt="feature-top" />
                    </div>

                    <div className="feature_article_inner">
                      <div className="tag_lg blue">
                        <a href="category.html">Top Viewed</a>
                      </div>

                      <div className="feature_article_title">
                        <h1>
                          <a href="single.html" target="_self">
                            Gadget user good news
                          </a>
                        </h1>
                      </div>

                      <div className="feature_article_date">
                        <a href="#" target="_self">
                          Stive Clark
                        </a>
                        ,<a href="#" target="_self">
                        Aug 4, 2015
                      </a>
                      </div>

                      <div className="feature_article_content">
                        In a move to address mounting concerns about security on Android...
                      </div>

                      <div className="article_social">
                  <span>
                    <i className="fa fa-share-alt"></i>
                    <a href="#">424</a>Shares
                  </span>
                        <span>
                    <i className="fa fa-comments-o"></i>
                    <a href="#">4</a>Comments
                  </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>








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
      <Col md="4">
      <div className="col-md-10">
        <div className="widget">
          <div className="widget_title widget_black">
            <h2><a href="#">Popular News</a></h2>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#"><img className="media-object" src="https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg" alt="Generic placeholder image" /></a>
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="single.html" target="_self">Canon launches photo-centric 00214 Model super shutter camera</a>
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
          <div className="media">
            <div className="media-left">
              <a href="#"><img className="media-object" src="https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg" alt="Generic placeholder image" /></a>
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="single.html" target="_self">Apple launches photo-centric wristwatch for Android</a>
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
          <div className="media">
            <div className="media-left">
              <a href="#"><img className="media-object" src="https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg" alt="Generic placeholder image" /></a>
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                <a href="single.html" target="_self">Kodak Hi-Speed shutter double shot camera coming soon</a>
              </h3>
              <span className="media-date"><a href="#">10Aug- 2015</a>, by: <a href="#">Eric Joan</a></span>

              <div className="widget_article_social">
        <span>
        <a href="single.html" target="_self"><i className="fa fa-share-alt"></i>424</a> Shares
        </span>
                <span>
        <a href="single.html" target="_self"><i className="fa fa-comments-o"></i>4</a> Comments
        </span>
              </div>
            </div>
          </div>
          <p className="widget_divider"><a href="#" target="_self">More News&nbsp;&raquo;</a></p>
        </div>


      </div>
</Col>
    </Row>

  );
};

export default Home;



