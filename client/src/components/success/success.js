import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [color, setColor] = React.useState("#ffffff");
    const[productDetails, setProductDetails] = useState(null);

    const [loading, setLoading] = React.useState(true);

    const name = location?.state?.name ? location?.state?.name: '';
    const email = location?.state?.email ? location?.state?.email: '';
    const orderId = location?.state?.order_id ?  location?.state?.order_id: '';
    const amount = location?.state?.amount ? location?.state?.amount:  '';
    const productId = location?.state?.productId ? location?.state?.productId: '';


    const override = {
        display: "block",
        margin: "200 auto",
        borderColor: "grey",
      };
    

    React.useEffect(() => {
        if(!productId) {
            navigate('/')
            window.location.reload()
        }
    })

    React.useEffect(async()=> {
        const productData =  await axios.get(`/api/blog/${productId}`);
        console.log(productData.data[0], 'product data is here')
        if(productData && productData.data && productData.data.length) {
            setProductDetails(productData.data[0])
        }
        console.log(productDetails, 'productDetails is hereeeee')
        setLoading(false)
     },[])
     console.log(productDetails, 'productDetails is hereeeee')
    //  console.log(productDetails, 'productDetails is here')
    if(!productDetails) {
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
        <div style={{width: '100vw', height: '100vh','padding': '130px 0 90px 0', display:'flex', alignItems:'center', justifyContent: 'center'}}>
        <div class="bg" style={{width:'60rem'}}>
            <div class="card checkout-card">
                <span class="card__success"><i class="ion-checkmark"></i></span>
                <h1 class="card__msg">Payment Complete</h1>
                <h2 class="card__submsg">Thank you for your transfer</h2>
                <h2>We will shortly send you the email for your order</h2>
                <div class="card__body">
                {productDetails?  <img src={`./img/${productDetails?.meta_description}/${productDetails?.front_image}`}class="card__avatar" /> : ''}
                <div class="card__recipient-info">
                    <p class="card__recipient">{name}</p>
                    <p class="card__email">{email}</p>
                </div>
                
                <h1 class="card__price"><span>₹</span>{amount}<span>.00</span></h1>
                </div>
                <div class="card__tags">
                    <span class="card__tag">completed</span>
                    <span class="card__tag">#{orderId}</span>
                </div>
            </div>
        </div>
        </div>

    )
}

export default Success;