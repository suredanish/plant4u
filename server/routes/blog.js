const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
const os = require('os');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: os.tmpdir(),
    filename: function (req, file, cb) {
        let name = Date.now() + "-" + file.originalname
        cb(null, name)
    }
});

let upload = multer({
    storage: multerStorage
}).any()


/**
 * @description GET /api/blog/
 */
 router.get('/', async ( req, res) => {
    try {
        const result = await Blog.find({})

        return res.status(200).send(result);
    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})

/**
 * @description GET /api/blog/
 */
router.get('/:param', async ( req, res) => {
    try {
        const result = await Blog.find({ meta_description: req.params.param });
        return res.status(200).send(result) ;
    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})

module.exports = router;