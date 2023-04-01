/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [color, setColor] = React.useState("#ffffff");
  const [productDetails, setProductDetails] = useState(null);
  const todayDate = new Date();
  const date = new Date();
  date.setDate(date.getDate() + 7);

  const [loading, setLoading] = React.useState(true);

  const name = location?.state?.name ? location?.state?.name : "";
  const email = location?.state?.email ? location?.state?.email : "";
  const orderId = location?.state?.order_id ? location?.state?.order_id : "";
  const amount = location?.state?.amount ? location?.state?.amount : "";
  const productId = location?.state?.productId
    ? location?.state?.productId
    : "";

  const override = {
    display: "block",
    margin: "200 auto",
    borderColor: "grey",
  };

  React.useEffect(() => {
    if (!productId) {
      navigate("/");
      window.location.reload();
    }
  });

  React.useEffect(async () => {
    const productData = await axios.get(`/api/blog/${productId}`);
    if (productData && productData.data && productData.data.length) {
      setProductDetails(productData.data[0]);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!productDetails) {
    return (
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  //   <img
  //   src={`./img/${productDetails?.meta_description}/${productDetails?.front_image}`}
  //   class="card__avatar"
  // />

  return (
    <div class="container mt-5 padding-top-50 font-family-poppins">
      <div class="d-flex align-items-center justify-content-between flex-change">
        <div class="mt-4">
          <h1 class="font-family-poppins" style={{ fontWeight: "700" }}>
            Payment Successfull
          </h1>
          <p class="font-family-poppins">
            Thank you for your transfer. We will shortly send you the email for
            your order
          </p>

          <div class="row">
            <div class="col-12 col-md-10 hh-grayBox">
              <div class="row justify-content-between">
                <div class="order-tracking completed">
                  <span class="is-complete"></span>
                  <p>
                    Ordered
                    <br />
                    <span>{todayDate.toDateString()}</span>
                  </p>
                </div>
                <div class="order-tracking completed">
                  <span class="is-complete"></span>
                  <p>
                    Confirmed
                    <br />
                    <span>{todayDate.toDateString()}</span>
                  </p>
                </div>
                <div class="order-tracking">
                  <span class="is-complete"></span>
                  <p>
                    Delivered
                    <br />
                    <span>{date.toDateString()}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a href="/">
            {" "}
            <button className="btn btn-primary">Continue Shopping </button>
          </a>

          {/* <div className="succssdetails"></div> */}
        </div>
        <div className="mt-4">
          <img src="./img/success.png" />
        </div>
      </div>
    </div>
  );
};

export default Success;
