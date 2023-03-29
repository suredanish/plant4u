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

  const structureShipppingData = () => {
    return {
      firstname: firstName,
      lastname: lastName,
      address: address,
      state: state,
      pinCode: postCode,
      city: city,
    };
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
              <Label className="text-sm">City</Label>
              <Input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
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
                className="mt-1.5"
                defaultValue=""
                required
              />
            </div>
            <div>
              <Label className="text-sm">Postal code</Label>
              <Input
                onChange={(e) => {
                  setPostCode(e.target.value);
                }}
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
              onClick={() => onCloseActive(structureShipppingData())}
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
