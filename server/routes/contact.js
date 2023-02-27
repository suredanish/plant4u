const express = require('express');
const router = express.Router();
const { createErrorObject } = require('../middleware/authenticate');
const sendEmail = require('../services/sendgrid')

/**
 * @description GET /api/course/
 */
 router.post('/', async ( req, res) => {
    try {
        const body = {
            email: req.body.email,
            name: req.body.name,
            message: req.body.message,
            subject: req.body.subject
        }
        const result = await sendEmail(req.body.email, body)
        return result;
    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})

module.exports = router;