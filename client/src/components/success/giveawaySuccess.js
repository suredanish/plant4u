/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const GiveawaySuccess = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchRandomNumber = async () => {
      try {
        setRandomNumber(location.state.randomNumber);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRandomNumber();
  }, []);

  return (
    <div class="container mt-5 padding-top-50 font-family-poppins">
      <div class="d-flex align-items-center justify-content-between flex-change">
        <div class="mt-4">
          <h1 class="font-family-poppins" style={{ fontWeight: "700" }}>
            Giveaway Successfull
          </h1>
          <p class="font-family-poppins">
            Thank you for your participation in this giveaway. We will shortly send you the email for
            your order
          </p>

          <div class="row">
            <div class="col-12 col-md-10 hh-grayBox">
                <p>Order ID: {randomNumber}</p>
            </div>
          </div>

          <a href="/">
            {" "}
            <button className="btn btn-primary">Continue Shopping </button>
          </a>

        </div>
        <div className="mt-4">
          <img src="./img/success.png" />
        </div>
      </div>
    </div>
  );
};

export default GiveawaySuccess;
