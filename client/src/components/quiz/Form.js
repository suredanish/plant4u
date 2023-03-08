import { max } from "moment";
import React from "react";

const Form = () => {
  return (
        <form style={{border: "1px solid black", display: "flex", flexDirection: "column", width: "20vw"}}>
            <label>
                Name:
                <input type="text" placeholder="Enter your name" />
            </label>
            <label>
                Contact:
                <input type="number" placeholder="Enter your contact number" />
            </label>
        </form>
  
    )
};

export default Form;
