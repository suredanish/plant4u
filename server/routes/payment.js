
const express = require('express');
const router = express.Router();
const {Transaction} = require('../models/Transcation')
const {Order} = require("../models/Order")
const crypto = require('crypto')
const mongoose = require('mongoose'); 
const { successTemplate } = require('../template/success')
const sendEmail = require('../services/sendgrid')
const common = require('../utils/common');

router.post('/', async(req,res) =>{
    // const keysecret = 'A63I3t7QoDkrmTitQbXHvNwK'
    const keysecret = process.env.RAZORPAY_KEY_SECRET
    const generated_signature = crypto.createHmac('sha256',keysecret)
    generated_signature.update(req.body.razorpay_order_id+"|"+ req.body.transactionid)
    const randomNumber = common.generateRandomNumber();

    if ( generated_signature.digest('hex') === req.body.razorpay_signature){
            const transaction = new Transaction({
              transactionid:req.body.transactionid,
              transactionamount:req.body.transactionamount,
          });
          if(req.body.order_id) {
               await Order.updateOne({_id : mongoose.Types.ObjectId(req.body.order_id)}, { transaction_id : req.body.transactionid, payment_status: 1, orderId: randomNumber })
          }
          try {

            const body = {
              email: req.body.email,
              deliveryAddress: req.body.address,
              itemTotal: req.body.transactionamount,
              itemShippingCharge: req.body.shippingCharge,
              orderId: randomNumber
            }
  
            const emailBody =  successTemplate(body);
            const subject = 'Order Placed Successfully';   
            const _ = await sendEmail(req.body.email, emailBody, subject)

          } catch( error ) {
            
            console.log('unable to send mail', error);
          }

          transaction.save(function(err, savedtransac){
            if(err){
                console.log(err);
                return res.status(500).send("Some Problem Occured");
            }

          return res.send({transaction: savedtransac});
  });
    }
    else{
      return res.send('failed');
    }
  });

  module.exports = router;