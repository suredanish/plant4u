import React, { useEffect, useState } from "react";
import moment from 'moment';
import { useParams } from "react-router-dom";

import Template from "../template";
import Quiz from "../quiz/Quiz";
import "./Blog.css";

const Blog = () => {

  const query = useParams();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [data, setData] = useState([]);
  const [popularBlogs, setpopularBlogs] = useState([]);
  const [metaDescription , setMetaDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if(query.params) {
      setMetaDescription(query.params)
      fetch(`http://localhost:5000/api/blog/${query.params}`)
        .then((res) => res.json())
        .then((actualData) => {
          setData(actualData);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(()=> {
    fetch("http://localhost:5000/api/blog")
    .then((res) => res.json())
    .then((blogList) => {
      setpopularBlogs(blogList)
    })
    .catch((error) => {
      setpopularBlogs([])
  }) 
  }, []);

  const openModal = function () {
    setIsModelOpen(true);
  };

  const closeModal = function () {
    setIsModelOpen(false);
  };

  if(!data.length) {
    return (
      <main id="main">
        <div>
          404 Not Found!
        </div>
      </main>
    )
  }

  return (
    <React.Fragment>
      <main id="main">
        <section className="single-post-content">
          <div className={`modal ${isModelOpen ? "show" : "hidden"}`}>
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <Quiz />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-9 post-content" data-aos="fade-up">
                <div className="single-post">
                  <div className="post-meta">
                    <span className="date">{ data && data.length && data[0].title}</span>
                    <span className="mx-1"> </span>
                    <span>{ data && data.length && moment(data[0].createdAt).format("MMM Do YY")}</span>
                  </div>
                  {data &&
                    data.map(({ _id, title, description }) => (
                      <div>
                        <h1 className="mb-5" key={_id}>
                          {title}
                        </h1>
                        <h2>
                          {description}
                        </h2>
                      </div>
                    ))}
                </div>
                  <Template metaDescription={metaDescription} />

                {/* Quiz form */}

                <h2>
                  Want to earn a free plant? Click below{" "}
                  <img
                    style={{ width: "2rem" }}
                    src="https://em-content.zobj.net/source/microsoft-teams/337/backhand-index-pointing-down_1f447.png"
                    alt="emoji"
                  />
                </h2>
                <button className="show-modal" onClick={openModal}>
                  Let's play a quiz
                </button>

                {/* Quiz form ends here */}
              </div>
              <div className="col-md-3">
                <div className="aside-block">
                  <ul
                    className="nav nav-pills custom-tab-nav mb-4"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-popular-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-popular"
                        type="button"
                        role="tab"
                        aria-controls="pills-popular"
                        aria-selected="true"
                      >
                        Popular
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-popular"
                      role="tabpanel"
                      aria-labelledby="pills-popular-tab"
                    >
                      {popularBlogs && popularBlogs.length &&
                      popularBlogs.map(({ _id, title, description, createdAt }) => (
                        <div>
                          <div className="post-entry-1 border-bottom" key={_id}>
                          <div className="post-meta">
                            <span className="date"> {title}</span>{" "}
                            <span className="mx-1"></span>{" "}
                            <span>{moment(createdAt).format("MMM Do YY")}</span>
                          </div>
                          <h2 className="mb-2">
                            <a href="#">
                            {description}
                            </a>
                          </h2>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>

                <div className="aside-block">
                  <h3 className="aside-title">Video</h3>
                  <div className="video-post">
                    <a
                      href="https://www.youtube.com/watch?v=AiFfDjmd0jU"
                      className="glightbox link-video"
                    >
                      <span className="bi-play-fill"></span>
                      <img
                        src="assets/img/post-landscape-5.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </a>
                  </div>
                </div>

                <div className="aside-block">
                  <h3 className="aside-title">Tags</h3>
                  <ul className="aside-tags list-unstyled">
                  {data && data.length && data[0].tags?.length &&
                      data[0].tags.map((tag) => (
                        <li>
                          <a href="">{tag}</a>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Blog;
