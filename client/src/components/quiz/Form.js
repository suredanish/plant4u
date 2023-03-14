import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { MDBInput } from 'mdb-react-ui-kit';

const Form = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const navigate = useNavigate();

  const setAddressDetails = (e, type)=>{
    if(type==='username')
        setUserName(e.target.value)
    else if(type==='email')
        setEmail(e.target.value)
    else if(type==='contact')
        setContact(e.target.value)
    else if(type==='address')
        setAddress(e.target.value)
    else if(type==='pincode')
        setPincode(e.target.value)           
  }

  const onClickNext = async  () => {
      
      const message = "Thank you for Order";
      const subject = "Order Placed" 

        axios.all([
          // Saving Form details in Db
          axios.post("/api/User/address", {username, email, contact, address, pincode}),
            // Send Email
          axios.post("api/contact", {email, username, message, subject})
            ])
           .then(axios.spread((data1, data2) => {
            console.log('data1', data1, 'data2', data2)  
          }))
           .catch((error) => {
            console.log( 'Error' + error);
        });;

        // Rendering Success Page
        navigate('/address/success');       

    };


  return (
    <form>  
      <MDBInput wrapperClass='mb-4' type='text' onChange={(e) => {setAddressDetails(e,'username')}} required='true' placeholder="Name" />
      <MDBInput wrapperClass='mb-4' type='email' onChange={(e) => {setAddressDetails(e, 'email')}}  required='true' placeholder="Email"/>
      <MDBInput wrapperClass='mb-4' type='tel' onChange={(e) => {setAddressDetails(e, 'contact')}}  required='true' placeholder="Phone"/>
      <MDBInput wrapperClass='mb-4' type='text' onChange={(e) => {setAddressDetails(e, 'address')}}
      required='true' placeholder="Address"/>
      <MDBInput wrapperClass='mb-4' type="number" onChange={(e)=>{setAddressDetails(e, 'pincode')}} required='true' placeholder="PinCode" maxLength="6"/>

      <button type='submit' onClick={onClickNext} > Submit </button>

    </form>
    )
};

export default Form;
