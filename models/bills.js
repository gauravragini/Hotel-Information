const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); //importing currency
const Currency = mongoose.Types.Currency;

const billSchema = new Schema({
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guest'
    },
    amount: {
        type: Currency,
        required: true,
        min: 0
    },
    paid: {
        type:Boolean,
        default: false
    },
    mode:{
        type:String,
        required: false
    }
}, {
    timestamps: true     
});

module.exports = mongoose.model('bill', billSchema);   
