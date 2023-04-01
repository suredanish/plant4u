const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const oredrSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    contact: {
        type: Number
    },
    state: {
        type: String,
        required: true
    },
    pincode : {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: Number
    },
    status: {
        type: Number
    },
    razorpay_order_id: {
        type : String
    },
    transaction_id: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    orderId: {
        type: Number
    }

});

const Order = mongoose.model('Order', oredrSchema);

module.exports = { Order }