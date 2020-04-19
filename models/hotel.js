const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location:{
        type: String,
        required:true
    },
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contact : {
        type: String,
        required: false
    },
    email : {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        default:false      
    }
}, {
    timestamps: true     
});

module.exports = mongoose.model('hotel', hotelSchema);   
