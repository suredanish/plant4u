import React from "react";
import Header from "../header/header";
import MainBody from '../main/main-body'
import { useEffect } from 'react';
const Home = () => {
    useEffect(()=> {
        /** Show Longetivity */
        window.longevity()
    }, [])

    return (
        <div>
            {/* <Header /> */}
            <div>hello</div>
            {/* <MainBody/> */}
        </div>
    )
}
export default Home;