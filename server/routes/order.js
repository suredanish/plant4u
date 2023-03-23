const express = require('express');
const router = express.Router();
const  Razorpay = require('razorpay');
const {Order} = require('../models/Order')

router.post('/', async (req,res) => {
try {
    var instance = new Razorpay({
        key_id: 'rzp_test_QQigWdX7dRNhG2',
        key_secret: 'A63I3t7QoDkrmTitQbXHvNwK'
      })
  
    var options = {
      amount: req.body.amount,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
      payment_capture : 1
    };
  
    //Need to save this order right here with all details we want
    instance.orders.create(options, async function(err, order) {
      if(err){
        return res.send(err)
      }
      else{
          const orderData = await new Order({
              name:req.body.name,
              email:req.body.email,
              contact: req.body.contact,
              address: req.body.address,
              state: req.body.state,
              pincode: req.body.pincode,
              productId: req.body.productId,
              amount: req.body.amount,
              city: req.body.city,
              payment_status: 0,
              status: 1,
              razorpay_order_id: order.id,
              transaction_id: null
          }).save()
          order.order_id = orderData._id
          return res.json(order)}
    });
    }
 catch ( error ) {
    console.log(error, "Error is heree")
    return res.status(401).send({status: false, message:'Error while saving Order'})
 }
});

  module.exports = router;