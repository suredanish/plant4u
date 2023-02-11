const {google} = require('googleapis');
const request = require("request");
const urlParse = require("url-parse");
const queryParse = require("querystring")
const { default: axios } = require("axios");
// const axios = require("axios")

const getHeartBeat = (req, res) => {
    const oauth2client = new google.auth.OAuth2(
            //client ID 
            "689052940602-4c0f7g2hm1ph27cm6qkjfmq9sjqm5jrt.apps.googleusercontent.com",
            //client secret
            "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",
            //link to redirect to
            "http://localhost:5000/steps"
        )
        const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"]

        const url = oauth2client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            state: JSON.stringify({
                callbackUrl : req.body.callbackUrl,
                userID: req.body.userid
            })
        })
        request(url, (err, response, body) => {
            console.log('error', err);
            console.log('statusCode:', response && response.statusCode);
            return res.send({ url})
        })
}

const steps = async (req, res) => {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    console.log(code)

    const oauth2client = new google.auth.OAuth2(
        //client ID 
        "689052940602-4c0f7g2hm1ph27cm6qkjfmq9sjqm5jrt.apps.googleusercontent.com",
        //client secret
        "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",
        //link to redirect to
        "http://localhost:5000/steps"
    )
    const tokens = await oauth2client.getToken(code)
    console.log(tokens)
    let stepArray = [];
    try {
        const result = await axios({
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type": "application/json",
            url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
            data: {
                aggregateBy: [
                    {
                        dataTypeName: "com.google.step_count.delta",
                        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                    }
                ],
                bucketBytime : {durationMills: 86400000},
                startTimeMills : Date.now(),
                endTimeMills: Date.now() + 3600000 // adding 1 hour slab
        }
        })

        stepArray = result.data.bucket;

        try {
            for(const dataSet of stepArray) {
                for(const points of dataSet.dataset) {
                    for(const steps of points.point) {
                        console.log(steps.value);
                    }
                }
            }
        } 
        catch ( error ) {
            console.log(error, 'error is here');
        }

    }
    catch ( error) {
        console.log(error.response.data.error, 'all error is here')
        return res.send({ status: false, message: error.response.data.error })
    }

    return res.send("Hello From shriom");
}

module.exports = { getHeartBeat, steps }