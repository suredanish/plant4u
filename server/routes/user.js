const express = require('express');
const router = express.Router();
const { User } = require('../models/User')
const { Blog } = require('../models/Blog')
const mongoose = require('mongoose');

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


/**
 * @description POST /api/User/
 */
router.post('/address', async( req, res) => {
    try {
        
        const blogId = '63f0e1f6fb8b742c6864ba57';

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            state: req.body.state,
            city: req.body.city,
            email: req.body.email,
            contact: req.body.contact,
            address: req.body.address,
            pincode: req.body.pincode,
            productId: blogId
        });

        newUser
            .save()
            .then()
            .catch(err => {
                console.log(err, "Error is here")
                return res.send({
                    success: false,
                    err,
                    error: 'Something went wrong, Please check the fields again'
                });
            });

        const getBlogDetails = await Blog.findOne({_id: mongoose.Types.ObjectId(blogId) })
        const _ = await Blog.updateOne({_id: mongoose.Types.ObjectId(blogId)}, { $inc: { "meta.GrabOfferCount": 1 }})

        if(getBlogDetails.meta.GrabOfferCount == process.env.OFFER_LIMIT) {
            const _ = await Blog.updateOne({_id: mongoose.Types.ObjectId(blogId)}, { "meta.isOfferValid": false})
        }
        
        return res.status(200).send({
            success: true,
            message: 'User Updated successfully'
        });

    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})


module.exports = router;