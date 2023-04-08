import React from "react";
const Header = () => {

    return (
        <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

            <a href="/" className="logo d-flex align-items-center">
  
            <img src="https://hesoyam.s3.amazonaws.com/plant4u/img/logo.jpg" style={{borderRadius: '50%'}} alt="" />
            <h1>plant4u</h1>
            </a>

            <nav id="navbar" className="navbar">
            <ul>
                <li><a href="/">Blog</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            </nav>
            {/* <!-- .navbar --> */}

            <div className="position-relative">

            <a href="https://www.instagram.com/plant4u_/?hl=en" className="mx-2"><span className="bi-instagram"></span></a>

            <a  className="mx-2 js-search-open"><span className="bi-search"></span></a>
            <i className="bi bi-list mobile-nav-toggle"></i>

            <div className="search-form-wrap js-search-form-wrap">
                <form action="search-result.html" className="search-form">
                <span className="icon bi-search"></span>
                <input type="text" placeholder="Search" className="form-control"/>
                <button className="btn js-search-close"><span className="bi-x"></span></button>
                </form>
            </div>
            {/* <!-- End Search Form --> */}

            </div>

        </div>

        </header>
    )
}
export default Header;
