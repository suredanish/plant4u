const express = require('express');
const router = express.Router();
const { User } = require('../models/User')

/**
 * @description GET /api/User/
 */
 router.get('/', async ( req, res) => {
    try {
        const result = await User.find({}, { username : 1});
        return res.status(200).send(result) ;
    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})


module.exports = router;