const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    transactionid:{
        type:String
    },
    transactionamount:{
        type:String
    },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { Transaction }