import axios from "axios";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const amount = location.state.amount * 100
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

    const openPayModal = () => {
        var options = {
          "key": process.env.REACT_APP_RAZORPAY_KEY,
          "amount": amount, // 2000 paise = INR 20, amount in paisa
          "name": "",
          "description": "",
          'order_id':"",
          "handler": function(response) {

              var values ={
                  razorpay_signature : response.razorpay_signature,
                  razorpay_order_id : response.razorpay_order_id,
                  transactionid : response.razorpay_payment_id,
                  transactionamount : amount,
                  order_id,
                  name: name,
                  email: email,
                  address: address, 
                  shippingCharge: shippingCharge
                }
              axios.post('/api/payment',values)
              .then(res=>{
                navigate('/success', {state: {name:name, email:email, amount: amount/100, order_id: order_id, productId: productId }})
                window.location.reload()
              })
              .catch(e=> {
                  console.log(e)
                  navigate('/', {})
                  window.location.reload()
                })
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

        axios.post('/api/order', {amount: amount, name:name, email:email, contact:contact, address:address, productId:productId, state:state, pincode:pincode, city:city })
        .then(res=>{
          console.log(res, 'response is hereeee')
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