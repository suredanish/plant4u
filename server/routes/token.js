const express = require('express');
const { createToken } = require('../utils/video-utils');
const router = express.Router();
const { User } = require('../models/User')

/**
 * @description POST /api/token/
 */
router.post('/', async (req, res) => {
  try {
    const { uid, channel } = req.body;
    const userID = req.user ? req.user._id : null ;

    const result = await User.find({_id: userID});

    if (!uid) {
      // errors.push({ param: 'no_content', msg: 'UID is missing in request' });
      // return res.json({ errors: createErrorObject(errors) });
      return res.json({ status: false, messsage: 'UID is missing in request'})
    }
  
    if (!channel) {
      // errors.push({ param: 'no_content', msg: 'Channel name is missing in request' });
      // return res.json({ errors: createErrorObject(errors) });
      return res.json({ status: false, messsage: 'Channel name is missing in request'})
    }

    if(!result.length) {
      return res.json({ status: false, messsage: 'Invalid user request Id'})
    }
    const role = result[0].admin == true || result[0].admin == false ? result[0].admin : null
    const token = createToken(channel, uid, role);
    return res.status(200).json({uid, channel, token});

  } catch ( error ) {
    console.log(error)
    return res.status(400).json({status: false, message: error?.message || error });

  }

});

module.exports = router;