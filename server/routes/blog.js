const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
const { TrendingBlog } = require('../models/TrendingBlog');
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
 * @description GET /api/blog/trending
 */
router.get('/trending', async ( req, res) => {
    try {
        const result = await TrendingBlog.find({}).sort({_id: -1}).limit(5);
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

/**
 * @description Post /api/blog/
 */

// Comparing arrays
const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

router.post('/quiz/answers', async ( req, res) => {
    try{
    const quizID = req.body.id;
    const quiz = await Blog.findById(quizID);
    //1. if  ansers is false
    //return status : false
    console.log(quiz.quiz_answerss)
    if(!compareArrays(quiz.quiz_answers, req.body.answers)){
        res.status(200).json({
            status: false
        })
    }
    //1. if all ansers is correct and isofferValid false
     //return status : true , canShowAddress: false
    else if(compareArrays(quiz.quiz_answers, req.body.answers) && quiz.meta.isOfferValid === false)
    {
        res.status(200).json({
            status: true,
            canShowAddress: false
        })
    }
    //1. if all ansers is correct and isofferValid true
    //return status : true , canShowAddress: true
    else if(compareArrays(quiz.quiz_answers, req.body.answers) && quiz.meta.isOfferValid === true){
        res.status(200).json({
            status: true,
            canShowAddress: true
        })
    }
}catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }

})
module.exports = router;