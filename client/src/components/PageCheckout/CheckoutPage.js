import * as React from 'react';
import Label from "../Label/Label.js";
import Prices from "./Prices.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../shared/Button/ButtonPrimary.tsx";
import Input from "../../shared/Input/Input.tsx";
import ContactInfo from "./ContactInfo.js";
import ShippingAddress from "./ShippingAddress.js";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import ReactCanvasConfetti from "react-canvas-confetti";
import {toast, ToastContainer} from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  };
}

const CheckoutPage = () => {

  const [tabActive, setTabActive] = useState("ContactInfo")
  const [email, setemail] = useState(null)
  const [contact, setContact] = useState(null)
  const [shippingDetails , setShippingDetails] = useState(null)
  const [product, setProduct] = useState(null)
  const refAnimationInstance = React.useRef(null);
  const [intervalId, setIntervalId] = useState();
  const [localStorageData, setLocalStorage] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const override = {
    display: "block",
    margin: "200 auto",
    borderColor: "grey",
  };

  const getInstance = React.useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = React.useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = React.useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);

  const stopAnimation = React.useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  const getBlogData = async() => {
    if(localStorage.getItem('productData')) {
      const jsonData = JSON.parse(localStorage.getItem('productData'));
      setLocalStorage(jsonData)
      const productData = await axios.get(`api/blog/${jsonData.id}`)

      if(productData && productData.data && productData.data.length) {
        setProduct(productData.data)
        setLoading(false)
      }
    }
  }

  React.useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };

  }, [intervalId]);

  React.useEffect(() => {
      getBlogData()
  },[])

  React.useEffect(() => {
    if(shippingDetails && (email || contact)) {
      saveAddress()
    }
    return () => {}

  }, [email])

  React.useEffect(() => {
    if(shippingDetails && (email || contact)) {
      saveAddress()
    }
    return () => {}
  }, [shippingDetails])

  if(!(localStorage.getItem('productData')) ) {

    const data = {
      id: location.state.id,
      status: location.state.status,
      price: location.state.price,
      shippingCharge: location.state.shippingCharge
    }

    localStorage.setItem('productData', JSON.stringify(data))

    setLocalStorage(data)
    if(location.state.status && location.state.price == 0) {
      startAnimation()
      toast.success('successful', {position: toast.POSITION.TOP_RIGHT, autoClose:15000})
      setTimeout(() => {
        stopAnimation()
      }, 10000)
    } else if(location.state.status) {
      toast.info('We have reached our limit for Free plant but you can buy this plant.', {position: toast.POSITION.TOP_RIGHT, autoClose:15000})
    } else if(!location.state.status) {
      toast.info('We have reached our limit for Free plant but you can buy this plant.', {position: toast.POSITION.TOP_RIGHT, autoClose:15000})
    }

  }

  const ConfirmOrder = () => {
    try {

        const body = {
          email: email,
          contact: contact,
          firstName: shippingDetails?.firstname,
          lastName: shippingDetails?.lastname,
          address: shippingDetails?.address,
          city: shippingDetails?.city,
          state: shippingDetails?.state,
          pincode: shippingDetails?.pinCode
        }
        const hasError = validateAddressBody(body)

        if(!hasError) {
          let paymentAmount = Number(product[0].price) + Number(location.state.shippingCharge)
          if(paymentAmount == 0) {
            //need to refresh or moved to some other success component
            navigate("/")
          } else {
            navigate('/payment', {
              state: {
                amount: paymentAmount,
                name: shippingDetails?.firstname,
                email: email, 
                contact: contact,
                productId: product[0]._id,
                address: shippingDetails.address, 
                pincode: shippingDetails.pinCode, 
                state: shippingDetails.state,
                city: shippingDetails.city ,
                shippingCharge: location.state.shippingCharge
              }
            })
          }
        }
    }
    catch ( error) {
      console.log(error);
    }
  }

  const saveAddress = async() => {
    const body = {
      email: email,
      contact: contact,
      firstName: shippingDetails.firstname,
      lastName: shippingDetails.lastname,
      address: shippingDetails.address,
      city: shippingDetails.city,
      state: shippingDetails.state,
      pincode: shippingDetails.pinCode
    }
    const hasError = validateAddressBody(body)
    if(!hasError) {
      const res = await axios.post("api/user/address", body);
    }
  }

  const handleScrollToEl = (id) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderProduct = (item, index) => {
    const { front_image, price, title, meta_description } = item;
    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
             src={`./img/${meta_description}/${front_image}`}
            alt={title}
            className="h-full w-full object-contain object-center"
          />
          <Link to="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between ">
            <div className="flex-[1.5] ">
              <h3 className="text-base font-semibold">
                <Link to="/product-detail">{title}</Link>
              </h3>
            </div>

            <div className="hidden flex-1 sm:flex justify-end">
              <Prices price={price} className="mt-0.5" />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={(contact, email) => {
              setemail(email);
              setContact(contact)
              //call API HERE FOR SAVE USERINFO
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={(shippingDetails) => {
              console.log(shippingDetails, 'shippingDetails is hereee')
              setShippingDetails(shippingDetails)
              setTabActive("");
              handleScrollToEl("ContactInfo");
              toast.success('successfully saved shipping address', {position: toast.POSITION.TOP_RIGHT, autoClose:2500})
            }}
          />
        </div>
      </div>
    );
  };

  const validateAddressBody = (body) => {
    let isError = false
    Object.keys(body).every((res) => {
      if(body[res] == undefined || body[res]== "" || body[res] == null) {
          isError = true
          toast.error(`${res} can not be empty!`, {position: toast.POSITION.TOP_RIGHT, autoClose:2000})
          return false
        }
      return true
    })
    return isError;
  }

  if(!(product && localStorageData)) {
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
    <div className="nc-CheckoutPage">
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        <ToastContainer />
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {product.map(renderProduct)}
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              <div>
                <Label className="text-sm">Discount code</Label>
                <div className="flex mt-1.5">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between py-2.5">
                <span>Item Total</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                ₹{product[0].price}
                </span>
              </div>
              {location.state.price == 0 ? 
                <div className="flex justify-between py-2.5">
                  <span>Item Discount</span>
                  <span style={{ color: 'green'}}className="font-semibold text-slate-900 dark:text-slate-200">
                  - ₹{product[0].price}
                  </span>
                </div>:''}
              <div className="flex justify-between py-2.5">
                <span>Shipping Estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                ₹{location.state.shippingCharge}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>To Pay</span>
                <span>₹{Number(location.state.shippingCharge) + (location.state.price == 0 ? 0 : Number(product[0].price))}</span>
              </div>
            </div>
            <ButtonPrimary onClick={()=> {ConfirmOrder()}} className="mt-8 w-full">
              Confirm order
            </ButtonPrimary>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
