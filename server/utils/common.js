"use strict";

const generateRandomNumber = () => {
    const minRange = 100000;
    const maxRange = 999999;
    const randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    return randomNumber;
}

module.exports = {
    generateRandomNumber
}
