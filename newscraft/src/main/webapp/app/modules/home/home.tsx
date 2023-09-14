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
import SmallArticleRight from "app/modules/home/SmallArticles/SmallArticleRight";
import SmallArticle2 from "app/modules/home/SmallArticles/SmallArticle2";
import SmallArticle3 from "app/modules/home/SmallArticles/SmallArticle3";
import SmallArticle4 from "app/modules/home/SmallArticles/SmallArticle4";
import SmallArticle5 from "app/modules/home/SmallArticles/SmallArticle5";
import SmallArticle6 from "app/modules/home/SmallArticles/SmallArticle6";
export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);


  return (
    <Row>
      {account?.login ? (
        <h2>Welcome, Reader!</h2>
      ) : (
        <h2>Welcome, Reader!</h2>
      )}


      <br/>
      <Col md="8">
        <Row>


            <div className="article-container">
            <h1 className="article-title">See you later, alligator: New Jersey police capture reptile on the loose for 2 weeks</h1>
            <p className="article-meta">Published on September 13th, 2023 </p>
            <img className="article-image" src="https://www.atptour.com/-/media/images/news/2023/09/08/01/19/medvedev-us-open-2023-sf-preview.jpg" alt="News Image"/>
              <p className="article-content">
                New Jersey law enforcement and wildlife officials teamed up as alligator investigators to capture a reptile running rampant across two towns over the last two weeks.

                The Middlesex Borough Police Department chronicled the missing gator saga on its Facebook page.

                The alligator, described as a “non-indigenous reptile” between 3 and 4 feet long, was first spotted in the Ambrose Brook at Victor Crowell Park in Middlesex County on August 23, according to the Middlesex Borough Police Department.

                Middlesex County is located about 38 miles southwest of New York City.

                The initial sighting prompted the closure of the park, which has since reopened to the public with no fishing or swimming allowed, Middlesex Borough police said in a statement Friday.
              </p>
              <p className="article-content">
                The police department, along with the New Jersey Department of Environmental Protection, the state’s Division of Fish and Wildlife Conservation Police and several other agencies searched for the alligator until it was finally caught Thursday night in another town.
                READ MORE HERE


              </p>
          </div>
          <div className="article-container">
                      <h1 className="article-title">See you later, alligator: New Jersey police capture reptile on the loose for 2 weeks</h1>
                      <p className="article-meta">Published on September 13th, 2023 </p>
                      <img className="article-image" src="https://www.atptour.com/-/media/images/news/2023/09/08/01/19/medvedev-us-open-2023-sf-preview.jpg" alt="News Image"/>
                        <p className="article-content">
                          New Jersey law enforcement and wildlife officials teamed up as alligator investigators to capture a reptile running rampant across two towns over the last two weeks.

                          The Middlesex Borough Police Department chronicled the missing gator saga on its Facebook page.

                          The alligator, described as a “non-indigenous reptile” between 3 and 4 feet long, was first spotted in the Ambrose Brook at Victor Crowell Park in Middlesex County on August 23, according to the Middlesex Borough Police Department.

                          Middlesex County is located about 38 miles southwest of New York City.

                          The initial sighting prompted the closure of the park, which has since reopened to the public with no fishing or swimming allowed, Middlesex Borough police said in a statement Friday.
                        </p>
                        <p className="article-content">
                          The police department, along with the New Jersey Department of Environmental Protection, the state’s Division of Fish and Wildlife Conservation Police and several other agencies searched for the alligator until it was finally caught Thursday night in another town.
                          READ MORE HERE


                        </p>
                    </div>
                    <div className="article-container">
                                <h1 className="article-title">See you later, alligator: New Jersey police capture reptile on the loose for 2 weeks</h1>
                                <p className="article-meta">Published on September 13th, 2023 </p>
                                <img className="article-image" src="https://www.atptour.com/-/media/images/news/2023/09/08/01/19/medvedev-us-open-2023-sf-preview.jpg" alt="News Image"/>
                                  <p className="article-content">
                                    New Jersey law enforcement and wildlife officials teamed up as alligator investigators to capture a reptile running rampant across two towns over the last two weeks.

                                    The Middlesex Borough Police Department chronicled the missing gator saga on its Facebook page.

                                    The alligator, described as a “non-indigenous reptile” between 3 and 4 feet long, was first spotted in the Ambrose Brook at Victor Crowell Park in Middlesex County on August 23, according to the Middlesex Borough Police Department.

                                    Middlesex County is located about 38 miles southwest of New York City.

                                    The initial sighting prompted the closure of the park, which has since reopened to the public with no fishing or swimming allowed, Middlesex Borough police said in a statement Friday.
                                  </p>
                                  <p className="article-content">
                                    The police department, along with the New Jersey Department of Environmental Protection, the state’s Division of Fish and Wildlife Conservation Police and several other agencies searched for the alligator until it was finally caught Thursday night in another town.
                                    READ MORE HERE


                                  </p>
                              </div>
                              <div className="article-container">
                                          <h1 className="article-title">See you later, alligator: New Jersey police capture reptile on the loose for 2 weeks</h1>
                                          <p className="article-meta">Published on September 13th, 2023 </p>
                                          <img className="article-image" src="https://www.atptour.com/-/media/images/news/2023/09/08/01/19/medvedev-us-open-2023-sf-preview.jpg" alt="News Image"/>
                                            <p className="article-content">
                                              New Jersey law enforcement and wildlife officials teamed up as alligator investigators to capture a reptile running rampant across two towns over the last two weeks.

                                              The Middlesex Borough Police Department chronicled the missing gator saga on its Facebook page.

                                              The alligator, described as a “non-indigenous reptile” between 3 and 4 feet long, was first spotted in the Ambrose Brook at Victor Crowell Park in Middlesex County on August 23, according to the Middlesex Borough Police Department.

                                              Middlesex County is located about 38 miles southwest of New York City.

                                              The initial sighting prompted the closure of the park, which has since reopened to the public with no fishing or swimming allowed, Middlesex Borough police said in a statement Friday.
                                            </p>
                                            <p className="article-content">
                                              The police department, along with the New Jersey Department of Environmental Protection, the state’s Division of Fish and Wildlife Conservation Police and several other agencies searched for the alligator until it was finally caught Thursday night in another town.
                                              READ MORE HERE


                                            </p>
                                        </div>
                                        <div className="article-container">
                                                    <h1 className="article-title">See you later, alligator: New Jersey police capture reptile on the loose for 2 weeks</h1>
                                                    <p className="article-meta">Published on September 13th, 2023 </p>
                                                    <img className="article-image" src="https://www.atptour.com/-/media/images/news/2023/09/08/01/19/medvedev-us-open-2023-sf-preview.jpg" alt="News Image"/>
                                                      <p className="article-content">
                                                        New Jersey law enforcement and wildlife officials teamed up as alligator investigators to capture a reptile running rampant across two towns over the last two weeks.

                                                        The Middlesex Borough Police Department chronicled the missing gator saga on its Facebook page.

                                                        The alligator, described as a “non-indigenous reptile” between 3 and 4 feet long, was first spotted in the Ambrose Brook at Victor Crowell Park in Middlesex County on August 23, according to the Middlesex Borough Police Department.

                                                        Middlesex County is located about 38 miles southwest of New York City.

                                                        The initial sighting prompted the closure of the park, which has since reopened to the public with no fishing or swimming allowed, Middlesex Borough police said in a statement Friday.
                                                      </p>
                                                      <p className="article-content">
                                                        The police department, along with the New Jersey Department of Environmental Protection, the state’s Division of Fish and Wildlife Conservation Police and several other agencies searched for the alligator until it was finally caught Thursday night in another town.
                                                        READ MORE HERE


                                                      </p>
                                                  </div>
                                                  <div className="article-container">
                                                              <h1 className="article-title">See you later, alligator: New Jersey police capture reptile on the loose for 2 weeks</h1>
                                                              <p className="article-meta">Published on September 13th, 2023 </p>
                                                              <img className="article-image" src="https://www.atptour.com/-/media/images/news/2023/09/08/01/19/medvedev-us-open-2023-sf-preview.jpg" alt="News Image"/>
                                                                <p className="article-content">
                                                                  New Jersey law enforcement and wildlife officials teamed up as alligator investigators to capture a reptile running rampant across two towns over the last two weeks.

                                                                  The Middlesex Borough Police Department chronicled the missing gator saga on its Facebook page.

                                                                  The alligator, described as a “non-indigenous reptile” between 3 and 4 feet long, was first spotted in the Ambrose Brook at Victor Crowell Park in Middlesex County on August 23, according to the Middlesex Borough Police Department.

                                                                  Middlesex County is located about 38 miles southwest of New York City.

                                                                  The initial sighting prompted the closure of the park, which has since reopened to the public with no fishing or swimming allowed, Middlesex Borough police said in a statement Friday.
                                                                </p>
                                                                <p className="article-content">
                                                                  The police department, along with the New Jersey Department of Environmental Protection, the state’s Division of Fish and Wildlife Conservation Police and several other agencies searched for the alligator until it was finally caught Thursday night in another town.
                                                                  READ MORE HERE


                                                                </p>
                                                            </div>

            <div />




{/*           <section id="feature_news_section" className="feature_news_section"> */}
{/*             <div className="container"> */}
{/*               <div className="row"> */}
{/*                 <div className="col-md-7"> */}
{/*                   <div > */}
{/*                     <div className="feature_article_img"> */}
{/*                       <img */}
{/*                         className="img-responsive top_static_article_img" */}
{/*                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1200px-Red_Panda_%2824986761703%29.jpg" */}
{/*                         alt="feature-top" */}
{/*                       /> */}
{/*                     </div> */}

{/*                     <div className="feature_article_inner"> */}
{/*                       <div className="tag_lg red"> */}
{/*                         <a href="category.html">Hot News</a> */}
{/*                       </div> */}
{/*                       <div className="feature_article_title"> */}
{/*                         <h1> */}
{/*                           <a href="single.html" target="_self"> */}
{/*                             Chevrolet car-saving technology delivers{' '} */}
{/*                           </a> */}
{/*                         </h1> */}
{/*                       </div> */}

{/*                       <div className="feature_article_date"> */}
{/*                         <a href="#" target="_self"> */}
{/*                           Stive Clark */}
{/*                         </a> */}
{/*                         ,<a href="#" target="_self"> */}
{/*                         Aug 4, 2015 */}
{/*                       </a> */}
{/*                       </div> */}

{/*                       <div className="feature_article_content"> */}
{/*                         In a move to address mounting concerns about security on Android, Google and Samsung are now issuing. */}
{/*                       </div> */}

{/*                       <div className="article_social"> */}
{/*                   <span> */}
{/*                     <i className="fa fa-share-alt"></i> */}
{/*                     <a href="#">424</a>Shares */}
{/*                   </span> */}
{/*                         <span> */}
{/*                     <i className="fa fa-comments-o"></i> */}
{/*                     <a href="#">4</a>Comments */}
{/*                   </span> */}
{/*                       </div> */}
{/*                     </div> */}
{/*                   </div> */}
{/*                 </div> */}

{/*                 <div className="col-md-5"> */}
{/*                   <div className="feature_static_wrapper"> */}
{/*                     <div className="feature_article_img"> */}
{/*                       <img className="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1200px-Red_Panda_%2824986761703%29.jpg" alt="feature-top" /> */}
{/*                     </div> */}

{/*                     <div className="feature_article_inner"> */}
{/*                       <div className="tag_lg purple"> */}
{/*                         <a href="category.html">Top Viewed</a> */}
{/*                       </div> */}
{/*                       <div className="feature_article_title"> */}
{/*                         <h1> */}
{/*                           <a href="single.html" target="_self"> */}
{/*                             Calculate's $180 Idol 3 4.7 is a{' '} */}
{/*                           </a> */}
{/*                         </h1> */}
{/*                       </div> */}

{/*                       <div className="feature_article_date"> */}
{/*                         <a href="#" target="_self"> */}
{/*                           Stive Clark */}
{/*                         </a> */}
{/*                         ,<a href="#" target="_self"> */}
{/*                         Aug 4, 2015 */}
{/*                       </a> */}
{/*                       </div> */}

{/*                       <div className="feature_article_content"> */}
{/*                         In a move to address mounting concerns about security on Android... */}
{/*                       </div> */}

{/*                       <div className="article_social"> */}
{/*                   <span> */}
{/*                     <i className="fa fa-share-alt"></i> */}
{/*                     <a href="#">424</a>Shares */}
{/*                   </span> */}
{/*                         <span> */}
{/*                     <i className="fa fa-comments-o"></i> */}
{/*                     <a href="#">4</a>Comments */}
{/*                   </span> */}
{/*                       </div> */}
{/*                     </div> */}
{/*                   </div> */}
{/*                 </div> */}

{/*                 <div className="col-md-5"> */}
{/*                   <div className="feature_static_last_wrapper"> */}
{/*                     <div className="feature_article_img"> */}
{/*                       <img className="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1200px-Red_Panda_%2824986761703%29.jpg" alt="feature-top" /> */}
{/*                     </div> */}

{/*                     <div className="feature_article_inner"> */}
{/*                       <div className="tag_lg blue"> */}
{/*                         <a href="category.html">Top Viewed</a> */}
{/*                       </div> */}

{/*                       <div className="feature_article_title"> */}
{/*                         <h1> */}
{/*                           <a href="single.html" target="_self"> */}
{/*                             Gadget user good news */}
{/*                           </a> */}
{/*                         </h1> */}
{/*                       </div> */}

{/*                       <div className="feature_article_date"> */}
{/*                         <a href="#" target="_self"> */}
{/*                           Stive Clark */}
{/*                         </a> */}
{/*                         ,<a href="#" target="_self"> */}
{/*                         Aug 4, 2015 */}
{/*                       </a> */}
{/*                       </div> */}

{/*                       <div className="feature_article_content"> */}
{/*                         In a move to address mounting concerns about security on Android... */}
{/*                       </div> */}

{/*                       <div className="article_social"> */}
{/*                   <span> */}
{/*                     <i className="fa fa-share-alt"></i> */}
{/*                     <a href="#">424</a>Shares */}
{/*                   </span> */}
{/*                         <span> */}
{/*                     <i className="fa fa-comments-o"></i> */}
{/*                     <a href="#">4</a>Comments */}
{/*                   </span> */}
{/*                       </div> */}
{/*                     </div> */}
{/*                   </div> */}
{/*                 </div> */}
{/*               </div> */}
{/*             </div> */}
{/*           </section> */}








{/* </Row> */}

{/*         <br/> */}
{/*         <p className="lead">This is your homepage</p> */}
{/*         {account?.login ? ( */}
{/*           <div> */}
{/*             <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert> */}
{/*           </div> */}
{/*         ) : ( */}
{/*           <div></div> */}
{/*         )} */}
{/*         <p> */}
{/*           If you like this project, don&apos;t forget to give us a star on{' '} */}
{/*           <a href="https://github.com/NewsCraftNews/NewsCraft/tree/main" target="_blank" rel="noopener noreferrer"> */}
{/*             GitHub */}
{/*           </a> */}
{/*           ! */}

{/*         </p> */}

 </Col>


      <div className="col-md-4" >
        <div className="widget">
          <div >

            <div className="widget_title widget_black"><a href="#" >More News</a></div>
          </div>

          <SmallArticleRight />
          <SmallArticle2/>
          <SmallArticle3/>
          <SmallArticle4/>
          <SmallArticle5/>
          <SmallArticle6/>


         <div>
          <p className="widget_divider"><a href="#" target="_self">More News&nbsp;&raquo;</a></p>
          <WeatherApp/>
             <News/>
        </div>



      </div>
</Col>

    </Row>



  );
};

export default Home;



