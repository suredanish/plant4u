import * as React from 'react';
import axios from "axios";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "200 auto",
  borderColor: "grey",
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const[totalTransactionAmount, setTotalTransactionAmount] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [color, setColor] = React.useState("#ffffff");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const name = location.state.name ? location.state.name : "plant4u"
    const email = location.state.email ?  location.state.email : "info@plant4u.in"
    const contact = location.state.contact ? location.state.contact : "7889896521"
    const address = location.state.address ? location.state.address : 'U 14/38 dlf phase 3'
    const productId = location.state.productId ? location.state.productId : null
    const state = location.state.state ? location.state.state : null
    const pincode = location.state.pincode ? location.state.pincode : null
    const city = location.state.city ? location.state.city : null
    const shippingCharge = location.state.shippingCharge ? location.state.shippingCharge : null;
    let order_id

    const getProductData = async() => {

      const productData = await axios.get(`/api/blog/${productId}`);
      if(productData?.data && productData?.data.length) {
        const totalTransaction = productData.data[0].price + (location.state.shippingCharge ? location.state.shippingCharge : 80)
        setTotalTransactionAmount(totalTransaction)
        setLoading(false)
      }
    }
    React.useEffect(() => {
      getProductData()
    }, [])

    if(loading) {
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

    const openPayModal = () => {
        var options = {
          "key": process.env.REACT_APP_RAZORPAY_KEY,
          "name": "",
          "description": "",
          'order_id':"",
          "handler": function(response) {
              var values ={
                  razorpay_signature : response.razorpay_signature,
                  razorpay_order_id : response.razorpay_order_id,
                  transactionid : response.razorpay_payment_id,
                  transactionamount : totalTransactionAmount,
                  order_id,
                  name: name,
                  email: email,
                  address: address, 
                  shippingCharge: shippingCharge
                }
              axios.post('/api/payment',values)
              .then(res=>{
                navigate('/success', {state: {name:name, email:email, amount: totalTransactionAmount, order_id: order_id, productId: productId }})
                window.location.reload()
              })
              .catch(e=> {
                  navigate('/', {})
                  window.location.reload()
                })
          },
          "modal": {
            "ondismiss": function(){
              navigate('/', {})
              window.location.reload()
             }
          },
          "prefill":{
              "name": name,
              "email": email,
              "contact": contact
          },
          "notes": {
            "address": address
          },
          "theme": {
            "color": "#528ff0"
          }
        };

        axios.post('/api/order', {amount: totalTransactionAmount * 100, name:name, email:email, contact:contact, address:address, productId:productId, state:state, pincode:pincode, city:city })
        .then(res=>{
            options.order_id = res.data.id;
            options.amount = res.data.amount;
            order_id = res.data.order_id;
            console.log(options)
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        })
        .catch(e=>console.log(e))

    };
    return (openPayModal())
}

export default Payment;