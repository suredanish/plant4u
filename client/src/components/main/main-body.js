import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";

const MainBody = () => {

  const [firstPriorityBlog, setFirstPriorityBlog] = useState(new Set())
  const [secongPriorityBlog, setSecondPriorityBlog] = useState(new Set())
  const [popularBlogs, setpopularBlogs] = useState(new Set());
  const [trendingBlogs, setTrendingBlogs] = useState(new Set());
  const [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: "200 auto",
    borderColor: "grey",
  };

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((blogList) => {
        if (blogList && blogList?.length) {
          blogList.forEach(element => {
            if (element?.meta?.priority == 1) {
              setpopularBlogs(oldValue => [...oldValue, element])
            } else if (element?.meta?.priority == 2) {
              setFirstPriorityBlog(oldValue => [...oldValue, element])
            } else if (element?.meta?.priority == 3) {
              setSecondPriorityBlog(oldValue => [...oldValue, element])
            }
          });
        }
      })
      .catch((error) => {
        // setBlogList([])
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);


  useEffect(() => {
    fetch("/api/blog/trending")
      .then((res) => res.json())
      .then((trendingBlog) => {

        if (trendingBlog && trendingBlog?.length) {
          setTrendingBlogs(trendingBlog)
        }
      })
      .catch((error) => {
        // setBlogList([])
      })
  }, []);

  if(!firstPriorityBlog?.length) {
    return (
      <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    )
  }
  return (
    <main id="main">
      <section id="posts" className="posts">
        <div className="container" data-aos="fade-up">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="post-entry-1 lg">
                {popularBlogs?.length > 0 ? (
                  <>
                    <div className="post-meta">
                      <span className="date">{popularBlogs[0].meta_description}</span>
                      <span className="mx-1"></span>
                      <span>{moment(popularBlogs[0].createdAt).format("MMM Do YY")}</span>
                    </div>
                    <h2>
                      <Link to={`/blog/${popularBlogs[0].meta_description}`}>
                        {popularBlogs[0].description}
                      </Link>
                    </h2>
                    <p className="mb-4 d-block">
                      {popularBlogs[0].mini_description}
                    </p>
                    <Link to={`/blog/${popularBlogs[0].meta_description}`}>
                      <img
                        src="./img/peaceLilly/peace-lilly-2.jpeg"
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                    <div className="d-flex align-items-center author">
                      <div className="photo">
                        <img
                          src="./img/peaceLilly/peace-lilly-1.jpeg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="name">
                        <h3 className="m-0 p-0">plant4u</h3>
                      </div>
                    </div>
                  </>
                ) : ''}
              </div>
                  </div>
              <div className="col-lg-8">
                <div className="row g-5">
                  <div className="col-lg-4 border-start custom-border">
                    {firstPriorityBlog && firstPriorityBlog.length > 0 &&
                      firstPriorityBlog.map((blog) => (
                        <div className="post-entry-1" key={blog.meta_description}>
                          <a href={`/blog/${blog.meta_description}`}>
                            <img
                              src={`./img/${blog.meta_description}/${blog.front_image}`}
                              alt=""
                              className="img-fluid"
                            />
                          </a>
                          <div className="post-meta">
                            <span className="date">{blog.title}</span>{" "}
                            <span className="mx-1"></span>{" "}
                            <span>{moment(blog.createdAt).format("MMM Do YY")}</span>
                          </div>
                          <h2>
                            <a href={`/blog/${blog.meta_description}`}>
                              {blog.description}
                            </a>
                          </h2>
                        </div>
                      ))}
                  </div>
                  <div className="col-lg-4 border-start custom-border">
                    {secongPriorityBlog && secongPriorityBlog.length > 0 &&
                      secongPriorityBlog.map((blog) => (
                        <div className="post-entry-1" key={blog.meta_description}>
                          <a href={`/blog/${blog.meta_description}`}>
                            <img
                              src={`./img/${blog.meta_description}/${blog.front_image}`}
                              alt=""
                              className="img-fluid"
                            />
                          </a>
                          <div className="post-meta">
                            <span className="date">{blog.title}</span>{" "}
                            <span className="mx-1"></span>{" "}
                            <span>{moment(blog.createdAt).format("MMM Do YY")}</span>
                          </div>
                          <h2>
                            <a href={`/blog/${blog.meta_description}`}>
                              {blog.description}
                            </a>
                          </h2>
                        </div>
                      ))}
                  </div>

                  <div className="col-lg-4">
                    <div className="trending">
                      <h3>Trending</h3>
                      <ul className="trending-post">
                        {trendingBlogs && trendingBlogs.length &&
                          trendingBlogs.map((trending, index) => (
                            <li key={index}>
                              <a href={`/blog/${trending.meta_description}`}>
                                <span className="number">{index + 1}</span>
                                <h3>
                                  {trending.description}
                                </h3>

                                <div className="d-flex align-items-center author">
                                  <div className="photo">
                                    <img
                                      src="./img/peaceLilly/peace-lilly-1.jpeg"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                  
                                </div>

                              </a>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="category-section">
        <div className="container" data-aos="fade-up">
          <div className="section-header d-flex justify-content-between align-items-center mb-5">
            {/* <h2>Culture</h2> */}
            {/* <div>
              <a href="category.html" className="more">
                See All Culture
              </a>
            </div> */}
          </div>

          <div className="row">
            <div className="col-md-9">
              <div className="d-lg-flex post-entry-2">
                <a
                  href="single-post.html"
                  className="me-4 thumbnail mb-4 mb-lg-0 d-inline-block"
                >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/FLb4FHJAWhI?autoplay=1" title="Beginner" frameBorder="0"></iframe>
                </a>
                <div>
                  <div className="post-meta">
                    <span className="date"></span>{" "}
                    {/* <span className="mx-1">&bullet;</span>{" "} */}
                    <span>Match 1th '23</span>
                  </div>
                  <h3>
                    <a href="single-post.html">
                      Gardening tips for beginners - expert advice to inspire all budding gardeners
                    </a>
                  </h3>
                  <p>
                    "Gardening is a process", says Sullivan. 
                    "It does not just happen in one day - it takes time". Sometimes impatience will cause you
                    to over water or fuss too much with the plants in the hopes that they will grow faster.
                  </p>
                  <div className="d-flex align-items-center author">
                    <div className="photo">
                      {/* <img
                        src="./img/person-2.jpg"
                        alt=""
                        className="img-fluid"
                      /> */}
                    </div>
                    <div className="name">
                      <h3 className="m-0 p-0">plant4u</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4">
                  <div className="post-entry-1 border-bottom">
                    <a href="single-post.html">
                      <img
                        src="./img/best-balcony-flowers.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </a>
                    <div className="post-meta">
                      <span className="date"></span>{" "}
                      <span>March 5th '23</span>
                    </div>
                    <h2 className="mb-2">
                      <a href="single-post.html">
                        How to Beautify Your Balcony With Plants by plant4u
                      </a>
                    </h2>
                    <span className="author mb-3 d-block">plant4u</span>
                  </div>


                </div>
                <div className="col-lg-8">
                  <div className="post-entry-1">
                    <a href="#">
                      <img height={'50px'}
                        src="./img/balcony-idea-1.jpeg"
                        alt=""
                        className="img-fluid"
                      />
                    </a>
                    <div className="post-meta">
                      <span className="date"></span>{" "}
                      <span>March 3rd '23</span>
                    </div>
                    <h2 className="mb-2">
                      <a href="#">
                        Balcony Design With Personal Touch
                      </a>
                    </h2>
                    <span className="author mb-3 d-block">plant4u</span>
                    <p className="mb-4 d-block">
                        Turn your Space into peaceful green corner with these beautiful plants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="post-entry-1 border-bottom">
                <div className="post-meta">
                  <span className="date"></span>{" "}
                  <span>1 march 2023</span>
                </div>
                <h2 className="mb-2">
                  <a href="#">
                      10 cozy balcony ideas by plant4u
                  </a>
                </h2>
                <div className="d-flex align-items-center author">
                    <div className="photo">
                      <img
                        src="./img/peaceLilly/peace-lilly-1.jpeg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="name">
                      <h3 className="m-0 p-0">plant4u</h3>
                    </div>
               </div>
              </div>

              <div className="post-entry-1 border-bottom">
                <div className="post-meta">
                  <span className="date"></span>{" "}
                  <span>3 march 2023</span>
                </div>
                <h2 className="mb-2">
                  <a href="#">
                      5 Modern balcony Ideas by plant4u
                  </a>
                </h2>
                <div className="d-flex align-items-center author">
                    <div className="photo">
                      <img
                        src="./img/peaceLilly/peace-lilly-1.jpeg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="name">
                      <h3 className="m-0 p-0">plant4u</h3>
                    </div>
               </div>
              </div>

              <div className="post-entry-1 border-bottom">
                <div className="post-meta">
                  <span className="date"></span>{" "}
                  <span>4 march 2023</span>
                </div>
                <h2 className="mb-2">
                  <a href="single-post.html">
                      10 unique Design for balcony by plant4u
                  </a>
                </h2>
                <div className="d-flex align-items-center author">
                    <div className="photo">
                      <img
                        src="./img/peaceLilly/peace-lilly-1.jpeg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="name">
                      <h3 className="m-0 p-0">plant4u</h3>
                    </div>
               </div>
              </div>

              <div className="post-entry-1 border-bottom">
                <div className="post-meta">
                  <span className="date"></span>{" "}
                  <span>6 march 2023</span>
                </div>
                <h2 className="mb-2">
                  <a href="single-post.html">
                    5 terrace garden design by plant4u
                  </a>
                </h2>
                <div className="d-flex align-items-center author">
                    <div className="photo">
                      <img
                        src="./img/peaceLilly/peace-lilly-1.jpeg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="name">
                      <h3 className="m-0 p-0">plant4u</h3>
                    </div>
               </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default MainBody;
