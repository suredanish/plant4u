import React, { useState } from "react";
import axios from "axios";
import {
    MDBInput,
    MDBBtn
  } from 'mdb-react-ui-kit';

const Form = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

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

  const onClickNext = async () => {
    await axios.post("api/User/address", {username,email,contact,address,
       pincode
      });
    };


  return (
    <form>  
      <MDBInput wrapperClass='mb-4' type='text' onChange={(e) => {setAddressDetails(e,'username')}} required='true' placeholder="Name" />
      <MDBInput wrapperClass='mb-4' type='email' onChange={(e) => {setAddressDetails(e, 'email')}}  required='true' placeholder="Email"/>
      <MDBInput wrapperClass='mb-4' type='tel' onChange={(e) => {setAddressDetails(e, 'contact')}}  required='true' placeholder="Phone"/>
      <MDBInput wrapperClass='mb-4' type='text' onChange={(e) => {setAddressDetails(e, 'address')}}
      required='true' placeholder="Address"/>
      <MDBInput wrapperClass='mb-4' type="number" onChange={(e)=>{setAddressDetails(e, 'pincode')}} required='true' placeholder="PinCode" maxLength="6"/>

      <MDBBtn className='mb-4' type='submit' onClick={onClickNext}>
        Submit
      </MDBBtn>
    </form>
    )
};

export default Form;
