import React, { useEffect, useState } from "react";
import Quiz from "../quiz/Quiz";
import "./Blog.css";
import moment from 'moment';
const Blog = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [data, setData] = useState([]);
  const [popularBlogs, setpopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/blog/peace")
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
  }, []);

  useEffect(()=> {
    fetch("http://localhost:5000/api/blog")
    .then((res) => res.json())
    .then((blogList) => {
      setpopularBlogs(blogList)
    })
    .catch((error) => {
      console.log(error, 'Error is here')
      setpopularBlogs([])
  }) 
  }, []);

  const openModal = function () {
    setIsModelOpen(true);
  };

  const closeModal = function () {
    setIsModelOpen(false);
  };

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

                  <p>
                    Peace lilies are beautiful and popular houseplants that are known for their lush green foliage and striking white flowers.
                  </p>
                  <div>
                    <img
                      src={require("../../assets/img/peaceLilly/peace-lilly-2.jpeg")}
                      alt=""
                      className="img-fluid"
                      style={{ height: 600}}
                    />
                    <figcaption>
                      Some Content to update
                    </figcaption>
                  </div>
                  <p>
                    These plants are easy to care for, making them a great choice for both novice and experienced gardeners.
                    In this blog, we will discuss the different aspects of the peace lily plant, including its origin, care requirements, and benefits.
                  </p>
                  <h2>Origin of Peace Lily</h2>
                  <p>
                    Peace lilies, also known as Spathiphyllum, are native to the tropical regions of Central and South America. The plant was first discovered in the rainforests of Colombia and Venezuela in the late 1800s.
                  </p>
                  <div className="my-4">
                    <img
                      src={require("../../assets/img/peaceLilly/peace-lilly-4.jpeg")}
                      alt=""
                      className="img-fluid"
                    />
                    <figcaption>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Explicabo, odit?{" "}
                    </figcaption>
                  </div>

                  <p>
                    The name "peace lily" was given to the plant due to its white flowers, which resemble a white flag of peace.
                  </p>
                  <h2>Care Requirements for Peace Lily</h2>
                  <p>Peace lilies are low-maintenance plants that are easy to care for. Here are some tips on how to care for your peace lily:</p>
                    
                  <h3>Lighting:</h3>
                  <p>
                    Peace lilies prefer bright, indirect sunlight. They can also grow in low light conditions, but their growth may be slower, and they may not produce as many flowers.
                  </p>

                  <h3>Watering:</h3>
                  <p>
                    Peace lilies prefer moist soil, but they do not like to sit in water. Water the plant when the soil feels dry to the touch. Overwatering can lead to root rot, so it's important not to water the plant too often.
                  </p>
                  
                  <h3>Temperature:</h3>
                  <p>Peace lilies thrive in temperatures between 65 and 80 degrees Fahrenheit. They do not like extreme heat or cold.</p>
                  
                  <h3>Fertilizer: </h3>
                  <p>Peace lilies do not require a lot of fertilizer. You can fertilize the plant once a month with a balanced, water-soluble fertilizer.</p>

                  <h2>Benefits of Peace Lily</h2>
                  <div>
                    <img
                      src={require("../../assets/img/peaceLilly/peace-lilly-1.jpeg")}
                      alt=""
                      className="img-fluid"
                    />
                    <figcaption>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Explicabo, odit?{" "}
                    </figcaption>
                  </div>
                  <p>
                    Aside from being beautiful houseplants, peace lilies have a number of benefits, including:
                  </p>
                  <h3>Air purification:</h3>
                  <p>Peace lilies are known for their air-purifying qualities. They can remove harmful pollutants such as formaldehyde, benzene, and trichloroethylene from the air.</p>

                  <h3>Stress relief:</h3>
                  <p>Being around nature has been shown to reduce stress levels. Having a peace lily in your home or office can create a calming and relaxing atmosphere.</p>

                  <h3>Increased productivity:</h3>
                  <p>Studies have shown that having plants in the workplace can increase productivity and creativity. Peace lilies are a great choice for office spaces, as they are easy to care for and can thrive in low light conditions.</p>
                  <div>
                    <img
                      src={require("../../assets/img/peaceLilly/peace-lilly-3.jpeg")}
                      alt=""
                      className="img-fluid"
                    />
                    <figcaption>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Explicabo, odit?{" "}
                    </figcaption>
                  </div>
                    <p>In conclusion, peace lilies are a wonderful addition to any home or office. They are easy to care for, beautiful to look at, and offer a number of benefits to your health and well-being. With a little love and attention, your peace lily can thrive and bring joy to your space for years to come</p>
                </div>

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
                    <li>
                      <a href="category.html">Indoor Plants</a>
                    </li>
                    <li>
                      <a href="category.html">Plants Lover</a>
                    </li>
                    <li>
                      <a href="category.html">Peace Lilly</a>
                    </li>
          
                    <li>
                      <a href="category.html">Stress Releaser</a>
                    </li>
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
