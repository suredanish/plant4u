import Label from "../Label/Label.js";
import React, { useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary.tsx";
import ButtonSecondary from "../../shared/Button/ButtonSecondary.tsx";
import Input from "../../shared/Input/Input.tsx";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const ShippingAddress = ({ isActive, onCloseActive, onOpenActive }) => {
  const [city, setCity] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [state, setState] = useState(null);
  const [postCode, setPostCode] = useState(null);

  const fetchPinData = async (pinCode, setValue) => {
    console.log("called ", pinCode);
    const res = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
    const data = await res.json();
    console.log("data ", data);
    if (data[0].Status === "Success" && setValue) {
      setCity(data[0].PostOffice[0].District);
      setState(data[0].PostOffice[0].State);
    }
    let returnValue = false;
    if (data[0].Status === "Success") {
      // check if pincode is from delhi, gurugram, ghaziabad or noida
      if (
        data[0].PostOffice[0].State === "Delhi" ||
        data[0].PostOffice[0].District === "Gurgaon" ||
        data[0].PostOffice[0].District === "Ghaziabad" ||
        data[0].PostOffice[0].Block === "Noida"
      ) {
        returnValue = true;
      }
    }
    return returnValue;
  };

  const fetchPinData2 = (pinCode, setValue) => {
    fetch(`https://api.postalpincode.in/pincode/${pinCode}`).then(
      async (res) => {
        const data = await res.json();
        if (data[0].Status === "Success" && setValue) {
          setCity(data[0].PostOffice[0].District);
          setState(data[0].PostOffice[0].State);
        }
      }
    );
  };

  const structureShipppingData = async () => {
    if (!postCode || !city || !firstName || !lastName || !address || !state) {
      onCloseActive({
        error: "Please fill all the fields",
      });
    } else {
      let isValid = await fetchPinData(postCode, false);
      console.log("is valid ", isValid);
      if (isValid) {
        onCloseActive({
          firstname: firstName,
          lastname: lastName,
          address: address,
          state: state,
          pinCode: postCode,
          city: city,
        });
      } else {
        onCloseActive({
          error: "Currently we are not delivering to your area.",
        });
      }
    }
  };

  const renderShippingAddress = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
        <div
          className="p-6 flex flex-col sm:flex-row items-start justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (isActive) {
              onCloseActive();
            } else {
              onOpenActive();
            }
          }}
        >
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="">Shipping Address</span>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">{address}</span>
            </div>
          </div>
          <div>{isActive ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          {/* ============ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <Label className="text-sm">First name</Label>
              <Input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                className="mt-1.5"
                defaultValue=""
                required
              />
            </div>
            <div>
              <Label className="text-sm">Last name</Label>
              <Input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                className="mt-1.5"
                defaultValue=""
              />
            </div>
          </div>

          {/* ============ */}
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label className="text-sm">Address</Label>
              <Input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
                className="mt-1.5"
                placeholder=""
                defaultValue={""}
                type={"text"}
                required
              />
            </div>
          </div>

          {/* ============ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <Label className="text-sm">Postal code</Label>
              <Input
                onChange={(e) => {
                  setPostCode(e.target.value);
                  if (e.target.value.length === 6) {
                    fetchPinData2(parseInt(e.target.value), true);
                  }
                }}
                value={postCode}
                className="mt-1.5"
                defaultValue=""
                required
              />
            </div>
            <div>
              <Label className="text-sm">City</Label>
              <Input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city}
                className="mt-1.5"
                defaultValue=""
                required
              />
            </div>
            <div>
              <Label className="text-sm">State/Province</Label>
              <Input
                onChange={(e) => {
                  setState(e.target.value);
                }}
                value={state}
                className="mt-1.5"
                defaultValue=""
                required
              />
            </div>
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              onClick={() => structureShipppingData()}
            >
              Save and next to Payment
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={onCloseActive}
            >
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };
  return renderShippingAddress();
};

export default ShippingAddress;
