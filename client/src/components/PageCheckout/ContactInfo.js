import Label from "../Label/Label.js";
import React, { useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary.tsx";
import ButtonSecondary from "../../shared/Button/ButtonSecondary.tsx";
import Input from "../../shared/Input/Input.tsx";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const ContactInfo = ({ isActive, onCloseActive, onOpenActive }) => {
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const renderAccount = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div
          className="flex flex-col sm:flex-row items-start p-6 justify-content-between align-items-center"
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
              <span className=" tracking-tight">Contact Details</span>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">{email}</span>
              <span className="ml-3 tracking-tighter">{phone}</span>
            </div>
          </div>
          <div>{isActive ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          <div className="">
            <Label className="text-sm">Email address</Label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mt-1.5"
              type={"email"}
            />
          </div>

          <div className="">
            <Label className="text-sm">Your contact number</Label>
            <Input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="mt-1.5"
              type={"tel"}
            />
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              onClick={() => onCloseActive(phone, email)}
            >
              Save and next to Shipping
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={() => onCloseActive()}
            >
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return renderAccount();
};

export default ContactInfo;
