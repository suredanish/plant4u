const express = require('express');
const router = express.Router();

const {steps, getHeartBeat} = require('../services/googleHealth')

/**
 * @description
 */
router.get('/steps', async (req, res) => {
    try {
        const data = await getHeartBeat(req,res)
        return data;

    }
    catch ( error ) {
        console.log(error)
        throw error ;
    }

});

router.get('/', async (req, res) => {
    try {
        const data = await steps(req,res);
        return data;
    }
    catch ( error ) {
        console.log(error)
        throw error ;
    }

});

module.exports = router;
