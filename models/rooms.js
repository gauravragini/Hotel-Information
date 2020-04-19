const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const roomSchema = new Schema({
    
    number: {
        type: Number,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required:true
    },
    available: {
        type: Boolean,
        default:true      
    },
    max_occupancy:{
        type: Number,
        required: false,
        default:2
    }
}, {
    timestamps: true     
});

module.exports = mongoose.model('room', roomSchema);   
