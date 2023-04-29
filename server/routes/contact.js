const express = require('express');
const router = express.Router();
const { createErrorObject } = require('../middleware/authenticate');
const sendEmail = require('../services/sendgrid')

/**
 * @description Post /api/contact/
 */
 router.post('/', async ( req, res) => {
    try {
        const body = {
            email: req.body.email,
            name: req.body.username,
            message: req.body.message,
            subject: req.body.subject
        }
        await sendEmail(req.body.email, body, req.body.subject);
    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})

module.exports = router;